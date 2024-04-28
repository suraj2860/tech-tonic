import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password, fullName } = await request.json();

        const existingUserVerifiedByUsername = await User.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 });
        }

        const existingUserByEmail = await User.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            
            if (existingUserByEmail.isVerified) {
                
                return Response.json({
                    success: false,
                    message: 'User already exists with this email'
                }, { status: 400 });

            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);

                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                fullName,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            });

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: 'User registered successfully. Please verify your email'
        }, { status: 201 });
    } catch (error) {
        console.error('Error occured while registering user :: ', error);
        return Response.json(
            {
                success: false,
                message: 'Error occured while registering user'
            },
            {
                status: 500
            }
        )
        
    }
}
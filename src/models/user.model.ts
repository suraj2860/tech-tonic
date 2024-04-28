import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    bio: string;
    avatar: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
};

const userSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email']             
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true
        },
        bio: {
            type: String
        },
        avatar: {
            type: String
        },
        verifyCode: {
            type: String,
            required: [true, "Verify code is required"]
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verify code expiry is required"]
        },
        isVerified: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema);

export default User;
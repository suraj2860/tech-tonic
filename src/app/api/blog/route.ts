import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
    await dbConnect();
    
    try {
        const {title, content} = await req.json();
        
        const token = await getToken({req: req});
    } catch (error) {
        
    }
}
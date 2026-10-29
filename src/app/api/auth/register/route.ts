import { NextRequest, NextResponse, } from "next/server";
import connectDB from "@/app/config/db";
import User from "@/app/model/user.model";
import bcrypt from "bcryptjs";



export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    await connectDB();

    try{
    const userExists = await User.findOne({ email });

    if (userExists) {
       return NextResponse.json({ message: "User already exists" }, { status: 400 });
        };

    if(password.length < 8){
        return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    const passwordHashed= await bcrypt.hash(password, 12);

    const user = await User.create({name, email, password: passwordHashed});

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });


}catch(err){
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}
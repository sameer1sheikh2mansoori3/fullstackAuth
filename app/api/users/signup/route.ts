import connectDb from "@/dbconfig/db";
import sendEmail from "@/helpers/email";
import User from "@/models/user.models";

import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
connectDb();
export async function POST(req: NextRequest) {
    const request = await req.json();
    let { username, email, password } = request;
    var salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    console.log(`your password is`, password, `and your hashedPassword`, hashedPassword)
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    })
    await user.save();


    return NextResponse.json({
        "message": user
    })
}
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({
            "message": "no user is found"
        })
    }

    const isValidate = bcryptjs.compareSync(password, user?.password);
    console.log(isValidate)
    if (isValidate === false) {
        return NextResponse.json({
            "message": "password is wrong",
            "success": false

        })
    }
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    const jwtData = jwt.sign({
        tokenData

    }, process.env.TOKEN_SECRET!, {
        expiresIn: '1d'
    })
    const response = NextResponse.json({
        "message": "login successfully",
        "Data": jwtData
    })
    response.cookies.set('token', jwtData)
    return response;



}
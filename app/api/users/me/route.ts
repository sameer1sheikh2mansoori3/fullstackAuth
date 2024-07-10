import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import connectDb from "@/dbconfig/db";


connectDb();

export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request);
        console.log(`we are inside users/me`, userId)
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}
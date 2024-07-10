import mongoose from "mongoose";

export default async function connectDb() {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI!)
        const hostName = res.connection.host
        console.log(`db is connected`, hostName)
    } catch (error: any) {
        console.log(`this is showing error in db connection`, error.message)
        throw new Error(error)

    }

}
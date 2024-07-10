
import mongoose from "mongoose";
interface Iuser {
    username: string,
    email: string,
    password: string,
    isVerfied: Boolean,


    isAdmin: Boolean,

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

}
const userSchema = new mongoose.Schema<Iuser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerfied: Boolean,


    isAdmin: Boolean,

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})
const User = mongoose.models?.User || mongoose.model('User', userSchema)
export default User;
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/user.models';
export default async function sendEmail({ email, emailType, userId }: any) {
    try {
        const salt = bcryptjs.genSaltSync(10);
        console.log((userId.toString()))

        const hashedId = bcryptjs.hashSync(userId.toString(), salt)
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedId,
            verifyTokenExpiry: Date.now() + 3600000,
        })
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "7f17db66cac3b9",
                pass: "739e5e415a0ef7"
            }
        });
        const mailOptions = {
            from: 'sand@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedId}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedId}
            </p>`
        }
        const emailresponse = await transport.sendMail(mailOptions);
        return emailresponse;
    } catch (error) {
        console.log(error)
    }

}
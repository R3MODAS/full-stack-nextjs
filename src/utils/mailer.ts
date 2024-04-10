import User from "@/models/User"
import nodemailer from "nodemailer"
import crypto from "crypto"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // generating a token
        const token = crypto.randomUUID()

        // checking the type of email (Verify Email/Reset Password)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 },
                { new: true }
            )
        }

        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000 },
                { new: true }
            )
        }

        // create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_NAME,
            port: process.env.HOST_PORT,
            auth: {
                user: process.env.HOST_USER,
                pass: process.env.HOST_PASS,
            }
        })

        // send the mail
        const info = await transporter.sendMail({
            from: "Sharadindu Das",
            to: `${email}`,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: ` ${emailType === "VERIFY" ? 
            `<p>Click <a target = "_blank" href="${process.env.DOMAIN}/verify-email?token=${token}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${token}</p>` : 
            `<p>Click <a target = "_blank" href="${process.env.DOMAIN}/reset-password?token=${token}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}</p>`}`
        })

        return info
    } catch (err: any) {
        throw new Error(err.message)
    }
}
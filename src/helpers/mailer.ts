import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

interface emailProps {
    email: string
    emailType: string,
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: emailProps) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "bc6f7a3f9abb80",
              pass: "da9b9f39d72afa"
            }
          });

        const mailOptions = {
            from: "bc6f7a3f9abb80",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (err: any) {
        throw new Error(err.message)
    }

}
import nodemailer from "nodemailer"
import crypto from "crypto"
import User from "@/models/User"

export const mailer = async ({email, emailType, userId}: any) => {
    try{
        // generate a unique token
        const token = crypto.randomUUID()

        // check the type of email (verify or reset)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                {_id: userId},
                {
                    $set : {verifyToken: token, verifyTokenExpiry: Date.now() + 60 * 60 * 1000}
                },
                {new: true}
            )
        }

        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                {_id: userId},
                {
                    $set : {forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000}
                },
                {new: true}
            )
        }

        // create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        // send the mail to the user
        const mailResponse = await transporter.sendMail({
            from: "Sharadindu Das",
            to: `${email}`,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: ` ${emailType === "VERIFY" ?
                `<p>Click <a target = "_blank" href="${process.env.DOMAIN}/verify-email?token=${token}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${token}</p>` :
                `<p>Click <a target = "_blank" href="${process.env.DOMAIN}/reset-password?token=${token}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}</p>`}` 
        })

        // return the mail response
        return mailResponse

    }catch(err: any){
        throw new Error(err.message)
    }
}
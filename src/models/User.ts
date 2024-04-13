import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected successfully !!!")
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error, please check for the connection", err)
            process.exit()
        })
    } catch (err) {
        console.log(`MongoDB connection error :\n`, err)
    }
}
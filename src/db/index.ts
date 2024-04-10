import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/nextjs`)
        const connection = mongoose.connection

        // if connection to mongodb is successful
        connection.on("connected", () => {
            console.log(`MongoDB is connected successfully`)
        })

        // if connection to mongodb fails
        connection.on("error", (err) => {
            console.log(`MongoDB connection error: `, err)
            process.exit(1)
        })
    } catch (err) {
        console.log(`Something went wrong while connecting to DB`)
        console.log(err)
    }
}
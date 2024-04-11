import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/chai-nextjs`)
        const connection = mongoose.connection

        // if connection is successful
        connection.on("connected", () => {
            console.log(`MongoDB is connected successfully`)
        })

        connection.on("error", (err) => {
            console.log(`MongoDB connection error: `,err)
            process.exit(1)
        })

    }catch(err){
        console.log(`Something went wrong while connecting to MongoDB with error: `,err)
    }
} 
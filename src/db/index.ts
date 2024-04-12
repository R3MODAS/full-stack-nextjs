import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URL}/chai-next`)
        const connection = mongoose.connection

        // if connection is successful
        connection.on("connected", () => {
            console.log(`MongoDB is connected successfully`)
        })

        // if connection fails
        connection.on("error", (err) => {
            console.log(`Failed to connect to MongoDB with an error: `,err)
            process.exit(1)
        })
    }catch(err){
        console.log(`Something went wrong while connecting to MongoDB: `,err)
    }
}
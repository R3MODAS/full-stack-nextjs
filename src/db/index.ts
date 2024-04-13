import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/nextjs`)
        const connection = mongoose.connection

        // Connection is successful
        connection.on("connected", () => {
            console.log(`MongoDB is connected successfully`)
        })

        // Connection is not successful
        connection.on("error", (err: any) => {
            console.log(`Failed to connect to MongoDB: `,err.message)
            process.exit(1)
        })
        
    }catch(err: any){
        console.log(`Something went wrong while connecting to MongoDB with error: `,err.message)
    }
}
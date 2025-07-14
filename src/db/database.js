import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try{
        const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connection successful ! DB HOST: ${connnectionInstance}`)
    }
    catch(error){
        console.log(`MongoDb connection error: ${error}`)
        process.exit(1)
    }
}

export default connectDB
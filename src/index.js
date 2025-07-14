import mongoose from "mongoose"
// import { DB_NAME } from "./constants"
import connectDB from "./db/database.js"
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App listening on port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed:" , error)
})



/*

we will not use this approach but this is also a valid approach to connect the database

import express from "express"
const app = express();

(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("Unable to connect to database")
            throw error
        })

        app.listen(process.env.PORT , () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("Unable to connect to database")
    }
})()
*/
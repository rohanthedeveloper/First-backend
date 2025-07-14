import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"   //cookie parser is used to access and set or edit the cookies from the users browser

const app = express()

//app.use() is used to set middlewares and do configurations //cors => cross origin resource sharing
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))  

//configuring input , like the input can be in the form of forms, json, objects ,etc.
app.use(json({
    limit : "16kb"
}))

//configuring the data coming from a url
app.use(express.urlencoded({
    extended : true ,   //using extended we can objects inside another object
    limit : "16kb"
}))

app.use(express.static("public"))  //public here is the folder name we made earlier

//configuring cookie parser
app.use(cookieParser())

export { app }
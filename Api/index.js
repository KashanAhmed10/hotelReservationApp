import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from "./Routes/auth.js"
import hotelRouter from "./Routes/hotels.js"
import roomRouter from "./Routes/rooms.js"
import userRouter from "./Routes/user.js"
import cookie from "cookie-parser"

const app = express()
dotenv.config()

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
        console.log("connected to the database")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("connection disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("connection connected")
})

app.use(cookie())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/hotel", hotelRouter)
app.use("/api/room", roomRouter)
app.use("/api/user", userRouter)
app.use((err,req,res,next) => {
    const statusCode=err.status || 500
    const errorMessage=err.message || "something went Wrong"
        return res.status(statusCode).json({
            success:false,
            status:statusCode,
            message:errorMessage,
            stack:err.stack
        })
}) 


app.listen(5000, () => {
    connect()
    console.log("connected to the backend localhost 5000")
})
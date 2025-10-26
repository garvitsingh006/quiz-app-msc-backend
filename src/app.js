import express, { urlencoded } from "express";
import cors from "cors";

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static("public"))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use((err, req, res, next) => {
    const statusCode = err.statusCoe || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

import questionRouter from './routes/question.router.js'
app.use("/api/v1/questions", questionRouter)

export {app}
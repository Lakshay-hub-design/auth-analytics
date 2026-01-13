import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express()

app.use(helmet())

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}))

app.use(express.json({ limit: "10kb"}))

app.use('/api/auth', authRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    })
})

app.use(errorHandler)

export default app
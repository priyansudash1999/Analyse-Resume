import express from "express"
import authRouter from "./routes/auth.routes"

const app = express()

app.use(express.json())

// using all routes here

app.use("/api/auth", authRouter)

export default app
import express from "express"
import dotenv from "dotenv";
import app from "./src/app.js"
import connectDb from "./src/config/db.js";

dotenv.config();

connectDb()

const mongodb_uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
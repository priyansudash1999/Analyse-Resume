import express from "express"
import { registerUserController } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register new User
 * @access Public
 */

authRouter.post("/register", registerUserController)

export default authRouter
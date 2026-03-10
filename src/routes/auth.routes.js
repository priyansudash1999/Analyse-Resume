import express from "express"
import { loginController, registerUserController } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register new User
 * @access Public
 */

authRouter.post("/register", registerUserController)

/**
 * @route POST /api/auth/login
 * @description login using email and password
 * @access Public
 */

authRouter.post("/login", loginController)

export default authRouter
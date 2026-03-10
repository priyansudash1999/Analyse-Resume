import express from "express"
import { loginUserController, registerUserController, logoutUserController } from "../controllers/auth.controllers.js"

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

authRouter.post("/login", loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear the token from user cookie and add the token in blacklist
 * @access user
 */

authRouter.get('/logout', logoutUserController)

export default authRouter
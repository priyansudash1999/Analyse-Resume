import express from "express"
import { loginUserController, registerUserController, logoutUserController, getmeController } from "../controllers/auth.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js"

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

/**
 * @route GET /api/auth/get-me
 * @description get the current loggedin user details
 * @access private
 */

authRouter.get('/get-me', authUser, getmeController)

export default authRouter
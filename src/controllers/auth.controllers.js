import userModel from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

/**
 * @name registerUserController
 * @description register a new user
 * @access Public
 */

async function registerUserController(req, res) {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email and password"
        })
    }

    const isUserExists = await userModel.findOne({
        $or: [{ name }, { email }]
    })

    if (isUserExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}




export { registerUserController }
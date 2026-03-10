import userModel from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import tokenBlacklistModel from "../models/blacklist.models.js"

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


/**
 * @name loginUser
 * @description login the user using email and password
 * @access user
 */

async function loginUserController(req, res){
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const password_validation = await bcrypt.compare(password, user.password)
    if(!password_validation){
        return res.status(400).json({
            message: "Invalid User or Password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    console.log(token);
    

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedin Successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUser
 * @description logout user using button
 * @access user
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;
    console.log(token);
    

    if (token) {
        await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out successfully"
    });
}

export { registerUserController, loginUserController, logoutUserController }
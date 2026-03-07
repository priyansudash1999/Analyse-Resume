import userModel from "../models/user.models";
import bcrypt from "bcryptjs";
import {jsonwebtoken} from "jsonwebtoken"

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request
 * @access Public
 */
async function registerUserController(req, res){
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please provide a name, an email and a password"
        })
    }

    const isUserExists = await userModel.findOne(
        {
            $or:[{userName}, {email}]
        }
    )
    if(isUserExists){
        return res.status(400).json({
            message: "Account exists with this email address or username"
        })
    }
    const hash = await bcrypt.hash({password, 10})
    const user = await userModel.create(
        {
            userName,
            email,
            password: hash
        }
    )
    const token = 
}

export {registerUserController}
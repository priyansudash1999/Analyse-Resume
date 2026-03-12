import jwt from "jsonwebtoken"
import tokenBlacklistModel from "../models/blacklist.models.js"

async function authUser(req, res, next){
    const token = req.cookies.token
    console.log("Cookies received:", req.cookies)
    
    if(!token){
        return res.status(401).json(
           { message: "Token not available"}
        )
    }

    const istokenBlacklisted = await tokenBlacklistModel.findOne({token})
    if(istokenBlacklisted){
        return res.status(401).json({ message: "Token is blacklisted" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
export {authUser}

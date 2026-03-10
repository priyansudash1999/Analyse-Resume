import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema(
    {
        token:{
            type:String,
            required: [true, "token is required to added in blacklist"]
        }
    }, {timestamps:true}
)

const tokenBlacklistModel = mongoose.model("blacklistTokens", blackListTokenSchema)

export default tokenBlacklistModel
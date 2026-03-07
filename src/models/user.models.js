import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
        type: String,
        unique: [true, "User name already exists"],
        required: true
        },
        email:{
            type: String,
            unique: [true, "Email already exists"],
            required: true
        },
        password:{
            type: String,
            required: true
        }
    }
)

const userModel = mongoose.model("users", userSchema)

export default userModel
import mongoose from "mongoose";

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB");
    } catch (error) {
        console.error(error);
    }
}

export default connectDb
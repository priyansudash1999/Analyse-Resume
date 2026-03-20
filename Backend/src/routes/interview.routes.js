import express from "express"
import { authUser } from "../middlewares/auth.middlewares.js"
import interviewController from "../controllers/interview.controllers.js"
import { upload } from "../middlewares/file.middlewares.js"
import { resume } from "../services/temp.js"

const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */
interviewRouter.post("/", authUser, upload.single("resume"), interviewController)

export default interviewRouter
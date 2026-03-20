import { PDFParse } from "pdf-parse"
import generateReport from "../services/ai.services.js"
import reportModel from "../models/report.models.js"

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file
    const resumeContent = await new PDFParse(Uint8Array.from(req.file.buffer)).getText()
    const {selfDesc, jobDesc} = req.body
    const interviewReportByAI = await generateReport(
        {
            resume: resumeContent.text,
            selfDesc,
            jobDesc
        }
    )

    const interviewReport = await reportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDesc: selfDesc,
        jobDesc: jobDesc,
        ...interviewReportByAI

    })
    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })
}

export default generateInterviewReportController
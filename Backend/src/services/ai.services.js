import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai"
import {z} from "zod"
import {zodToJsonSchema} from "zod-to-json-schema"
import { resume, selfDesc, jobDesc } from "./temp.js";


const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// const invokeGeminiAI = async () => {
//   const res = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Hello Gemini! Explain what an interview is."
//   });

//   console.log(res.text);
// };

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("A score between 0 and 100 indicating how well the candidate's profile matched the job description"),
  technicalQues: z.array(z.object({
    question: z.string().describe("The technical questions can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking the question"),
    answer: z.string().describe('How to answer the question, what points to cover, what approach to take')
  })).describe('Techincal questions that can be asked in the interview along with their intention'),
  behaviouralQues: z.array(z.object({
    question: z.string().describe("The behavioural questions can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking the question"),
    answer: z.string().describe('How to answer the question, what points to cover, what approach to take')
  })).describe('Behavioural questions that can be asked in the interview along with their intention and how to answer them'),
  skillGaps: z.array(z.object({
    skills: z.string().describe("The skill which the candidate is lacking"),
    severity: z.enum(['low', 'medium', 'high']).describe('The severity of skill gap i.e how important is this')
  })).describe('list of skill gaps in the candidate profile along with their severity'),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan starting from 1"),
    focus: z.string().describe("The main focus of this day in the preparation plan e.g data structure, system design, mock interview"),
    tasks: z.array(z.string()).describe('List of tasks to be done on this day to follow the preparation')
  })).describe("A day wise preparation plan for the candidate to follow in e.g day 1:- React Interview Prepare question, day 2:- Backend iterview questions prepare, day 3:- About full stacks") 
})

async function generateReport() {
  const prompt = `
  Generate a detailed interview report in JSON format.

  STRICT RULES:
  - Return ONLY valid JSON
  - Do NOT include resume or job description in output

  Structure:
  {
    "matchScore": number,
    "technicalQues": [
      {
        "question": string,
        "intention": string,
        "answer": string
      }
    ],
    "behaviouralQues": [...],
    "skillgaps":[...],
    "preparationPlan": [
      {
        "day": number,
        "focus": string,
        "tasks": [string]
      }
    ]
  }

  Include:
  - minimum 5 technical questions
  - minimum 3 behavioural questions
  - minimum 5-day preparation plan

  Resume:
  ${resume}

  Self Description:
  ${selfDesc}

  Job Description:
  ${jobDesc}
  `;

  const response = await ai.chat.completions.create({
    model: "gpt-4o-mini", // fast & cheap
    messages: [
      {
        role: "system",
        content: "You are an expert interview preparation assistant. Always return valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: {
      type: "json_object"
    }
  });

  const data = response.choices[0].message.content;

  return JSON.parse(data)
}

export default generateReport;
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

console.log("API KEY:", process.env.GOOGLE_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

const invokeGeminiAI = async () => {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello Gemini! Explain what an interview is."
  });

  console.log(res.text);
};

export default invokeGeminiAI;
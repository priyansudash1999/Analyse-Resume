import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import invokeGeminiAI from "./src/services/ai.services.js";

// console.log("API KEY:", process.env.GOOGLE_API_KEY);

connectDb();
invokeGeminiAI();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
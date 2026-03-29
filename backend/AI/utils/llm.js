import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv";
dotenv.config();

const MyapiKey = process.env.API_KEY;

if (!MyapiKey) {
  throw new Error("Missing GROQ API Key");
}
export const llm = new ChatGroq({
    apiKey : MyapiKey,
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    // maxTokens: 3000,
})

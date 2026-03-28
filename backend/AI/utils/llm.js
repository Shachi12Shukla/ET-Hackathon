import { ChatGroq } from "@langchain/groq"

const MyapiKey = process.env.ET_API_KEY_AI;

if (!MyapiKey) {
  throw new Error("Missing GROQ API Key");
}
export const llm = new ChatGroq({
    apiKey : MyapiKey,
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    // maxTokens: 3000,
})

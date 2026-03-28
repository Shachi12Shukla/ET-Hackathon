import { llm } from "../utils/llm.js";
import { safeParse } from "../utils/parser.js";

export async function runNavigator(profile) {
  const prompt = `
    You are ET Financial Life Navigator.

    Goal:
    - Understand user's complete financial life
    - Identify gaps and opportunities
    - Recommend MULTIPLE ET services (not limited)

    Profile:
    ${JSON.stringify(profile)}

    Instructions:
    - Think across:
    - investments
    - insurance
    - loans
    - tax planning
    - savings
    - credit optimization
    - Push discovery beyond obvious needs
    - Recommend at least 4–6 services

    Return ONLY JSON:

    {
    "insights": ["..."],
    "recommendations": [
        {
        "action": "...",
        "et_service": "..."
        }
    ],
    "priority": "..."
    }
    `;

  const res = await llm.invoke(prompt);
  return safeParse(res.content);
}
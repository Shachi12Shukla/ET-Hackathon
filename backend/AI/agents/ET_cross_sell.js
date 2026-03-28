import { llm } from "../utils/llm.js";
import { safeParse } from "../utils/parser.js";

export async function runCrossSell(profile, navigatorOutput) {
  const etContext = `
    ET Ecosystem includes:

    1. ET Prime:
    Premium content, deep financial insights, for serious investors.

    2. ET Markets:
    Tools for tracking stocks, trends, and trading insights.

    3. ET Wealth:
    Guidance for long-term investment and financial planning.

    4. ET Masterclass & Events:
    Learning from experts and networking.

    5. ET Money:
    Loans, insurance, credit cards via partnerships.
    `;
  const prompt = `
    You are ET Cross-Sell Engine.

    Goal:
    - Suggest additional ET services user may not know
    - Expand beyond current recommendations

    Profile:
    ${JSON.stringify(profile)}

    Navigator Output:
    ${JSON.stringify(navigatorOutput)}

    Return ONLY JSON:

    {
      "offers": [
        {
          "service": "...",
          "reason": "..."
        }
      ],
      "timing": ""
    }
    `;

  const res = await llm.invoke(prompt);
  return safeParse(res.content);
}
import { runConcierge } from "../agents/Concierge.js";
import { runNavigator } from "../agents/navigator.js";
import { runCrossSell } from "../agents/ET_cross_sell.js";

export async function handleAI(profile, message) {
  // build profile 
  const concierge = await runConcierge(profile, message);

  const updatedProfile = concierge.updatedProfile || profile;

  // if user is still answering questions 
  if (concierge.type === "question") {
    return {
      stage: "onboarding",
      profile: updatedProfile,
      reply: concierge.question
    };
  }

  // 1. Navigator - Agent that understands the user's complete financial life and guides them to the right ET tools and partner services  
  // 2. ET Marketplace Agent - A sub-agent that acts as a concierge for financial services of ET

  const navigatorOutput = await runNavigator(updatedProfile);

  //  AI that sits across all ET touchpoints and proactively identifies cross-sell and upsell opportunities
  const crossSell = await runCrossSell(updatedProfile, navigatorOutput);

  return {
    stage: "completed",
    profile: updatedProfile,
    insights: navigatorOutput.insights,
    recommendations: navigatorOutput.recommendations,
    priority: navigatorOutput.priority,
    crossSell
  };
}
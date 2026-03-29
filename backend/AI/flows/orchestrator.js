import { runConcierge } from "../agents/Concierge.js";
import { runNavigator } from "../agents/navigator.js";
import { runCrossSell } from "../agents/ET_cross_sell.js";

/**
 *  Map AI flat profile → DB schema
 */
function mapToSchema(existingProfile = {}, aiProfile = {}) {
  return {
    personal: {
      name: aiProfile.name || existingProfile.personal?.name,
      age:  aiProfile.age ? Number(aiProfile.age) : existingProfile.personal?.age,
    },

    preferences: {
      interestedServices:
        aiProfile.interest ||
        existingProfile.preferences?.interestedServices ||
        [],
    },

    financial: {
      income: aiProfile.income || existingProfile.financial?.income,
      goals: aiProfile.goals || existingProfile.financial?.goals || [],
    },

    investments: {
      interestedInInvesting:
        aiProfile.interestedInInvesting ??
        existingProfile.investments?.interestedInInvesting,

      experienceLevel:
        aiProfile.investmentExperience ||
        existingProfile.investments?.experienceLevel,

      assets: {
        mutualFunds:
          aiProfile.mutualFunds ??
          existingProfile.investments?.assets?.mutualFunds ??
          false,
        stocks:
          aiProfile.stocks ??
          existingProfile.investments?.assets?.stocks ??
          false,
        fixedDeposits:
          aiProfile.fixedDeposits ??
          existingProfile.investments?.assets?.fixedDeposits ??
          false,
        crypto:
          aiProfile.crypto ??
          existingProfile.investments?.assets?.crypto ??
          false,
      },
    },

    liabilities: {
      hasLoans:
        aiProfile.hasLoans ?? existingProfile.liabilities?.hasLoans ?? false,
      emiAmount:
        aiProfile.emiAmount ?? existingProfile.liabilities?.emiAmount ?? 0,
    },

    insurance: {
      hasHealthInsurance:
        aiProfile.hasHealthInsurance ??
        existingProfile.insurance?.hasHealthInsurance ??
        false,

      hasLifeInsurance:
        aiProfile.hasLifeInsurance ??
        existingProfile.insurance?.hasLifeInsurance ??
        false,
    },

    behavior: {
      spending:
        aiProfile.spending || existingProfile.behavior?.spending,
      saving:
        aiProfile.saving || existingProfile.behavior?.saving,
    },

    credit: {
      hasCreditCard:
  aiProfile.creditCard === true || aiProfile.creditCard === "yes"
    ? true
    : aiProfile.creditCard === false || aiProfile.creditCard === "no"
    ? false
    : existingProfile.credit?.hasCreditCard ?? false,

      creditScore:
        aiProfile.creditScore ||
        existingProfile.credit?.creditScore,
    },

    compliance: {
  filesITR:
    aiProfile.itr === true || aiProfile.itr === "yes"
      ? true
      : aiProfile.itr === false || aiProfile.itr === "no"
      ? false
      : existingProfile.compliance?.filesITR ?? false,
},
  };
}

/**
 * MAIN AI ORCHESTRATION
 */
export async function handleAI(profile, message) {
  try {
    // 1. Run Concierge Agent (Q&A + extraction)
    const concierge = await runConcierge(profile, message);

    // 2. Map AI output → schema
    const updatedProfile = mapToSchema(
      profile,
      concierge.updatedProfile || {}
    );

    // 3. If still onboarding → ask next question
    if (concierge.type === "question") {
      return {
        stage: "onboarding",
        profile: updatedProfile,
        reply:
          concierge.question ||
          "Got it Let’s continue — tell me more about your finances."
      };
    }

    // 4. Run Navigator (deep financial understanding)
    const navigatorOutput = await runNavigator(updatedProfile);

    // 5. Run Cross-Sell Engine
    const crossSell = await runCrossSell(
      updatedProfile,
      navigatorOutput
    );

    // 6. Final response
    return {
      stage: "completed",
      profile: updatedProfile,
      reply: "Here’s what I recommend for you",

      insights: navigatorOutput.insights || [],
      recommendations: navigatorOutput.recommendations || [],
      priority: navigatorOutput.priority || "medium",
      crossSell: crossSell || {},
    };

  } catch (err) {
    console.error("AI Orchestration Error:", err);

    return {
      stage: "error",
      profile,
      reply: "Something went wrong. Let’s try again.",
    };
  }
}
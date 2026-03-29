import express from "express";
import { handleAI } from "../AI/flows/orchestrator.js";
import UserProfile from "../models/UserProfile.js";
import { runConcierge } from "../AI/agents/Concierge.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    let { userId, message } = req.body;

    console.log("👉 Incoming:", { userId, message });

    let profile;

    // FIRST CALL
    if (!userId) {
      profile = await UserProfile.create({});

      const aiStart = await runConcierge(profile, "start");

      return res.json({
        reply: aiStart.question || "Hi 👋 What’s your name?",
        userId: profile._id,
        profile
      });
    }

    // EXISTING USER
    profile = await UserProfile.findById(userId);

    if (!profile) {
      console.log("⚠️ Profile missing, creating new");
      profile = await UserProfile.create({});
    }

    const aiResponse = await handleAI(profile, message);

    console.log("🤖 AI RESPONSE:", aiResponse);

    // 🚨 CRITICAL FIX
    if (!aiResponse || !aiResponse.profile) {
      return res.json({
        reply: "Got it 👍 Tell me more.",
        userId,
        profile
      });
    }

    await UserProfile.findByIdAndUpdate(
  userId,
  {
    $set: {
      "personal.name": aiResponse.profile.personal?.name,
      "personal.age": aiResponse.profile.personal?.age,

      "financial.income": aiResponse.profile.financial?.income,
      "financial.goals": aiResponse.profile.financial?.goals,

      "behavior.spending": aiResponse.profile.behavior?.spending,
      "behavior.saving": aiResponse.profile.behavior?.saving,

      "credit.hasCreditCard": aiResponse.profile.credit?.hasCreditCard,
      "credit.creditScore": aiResponse.profile.credit?.creditScore,

      "compliance.filesITR": aiResponse.profile.compliance?.filesITR
    }
  },
  { new: true }
);

    return res.json({
      reply: aiResponse.reply || "Let’s continue...",
      userId,
      profile: aiResponse.profile,
      stage: aiResponse.stage,
      insights: aiResponse.insights,
      recommendations: aiResponse.recommendations,
      crossSell: aiResponse.crossSell
    });

  } catch (err) {
    
    return res.status(200).json({   
      reply: "Hmm 🤔 I didn’t catch that properly. Can you rephrase?",
    });
  }
});
export default router;
import dotenv from "dotenv";
// dotenv.config();

import { handleAI } from "./AI/flows/orchestrator.js";

// simulate empty new user
let profile = {};

async function runTest() {
  let message = "Hi";

  while (true) {
    const res = await handleAI(profile, message);

    console.log("\n🤖 AI:", res.reply || res);

    // update profile
    profile = res.profile;

    // if onboarding complete → break
    if (res.stage === "completed") {
      console.log("\n🎯 FINAL OUTPUT:\n", JSON.stringify(res, null, 2));
      break;
    }

    
    const input = await new Promise((resolve) => {
      process.stdin.once("data", (data) => {
        resolve(data.toString().trim());
      });
    });

    message = input;
  }
}

runTest();
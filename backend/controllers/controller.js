import { getUserProfile } from "../../services/ProfileService.js";
import { runConcierge } from "../agents/conciergeAgent.js";
import { runNavigator } from "../agents/navigatorAgent.js";
import { runMarketplace } from "../agents/marketplaceAgent.js";
import { runCrossSell } from "../agents/crossSellAgent.js";

export async function handleUser(userId, message) {
  let profile = await getUserProfile(userId);

  // build profile for new user
  if (!profile) {
    profile = await runConcierge(message);
  }

  const insights = await runNavigator(profile);

  const [services, crossSell] = await Promise.all([
    runMarketplace(insights),
    runCrossSell(profile, insights),
  ]);

  return {
    message: "Here is your financial plan 🚀",
    profile,
    insights,
    services,
    crossSell,
  };
}
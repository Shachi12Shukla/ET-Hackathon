const UserProfile = require("../models/UserProfile");

// Create or get profile
exports.getOrCreateProfile = async (userId) => {
  let profile = await UserProfile.findOne({ userId });

  if (!profile) {
    profile = await UserProfile.create({ userId });
  }

  return profile;
};

// Update profile field
exports.updateProfileField = async (userId, field, value) => {
  return await UserProfile.findOneAndUpdate(
    { userId },
    { $set: { [field]: value } },
    { new: true }
  );
};
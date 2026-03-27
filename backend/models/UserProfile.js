const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  //PERSONAL INFO
  personal: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 16,
      max: 100,
    },
  },

  //ET SERVICES INTEREST
  preferences: {
    interestedServices: [
      {
        type: String,
        enum: [
          "ET Prime",
          "ET Markets",
          "ET Money",
          "Masterclass",
          "Loans",
          "Insurance",
          "Credit Cards",
        ],
      },
    ],
  },

  //FINANCIAL PROFILE
  financial: {
    income: {
      type: String, 
      enum: ["<20k", "20k-50k", "50k-1L", "1L+"],
    },
    goals: [String],
  },

  //INVESTMENTS
  investments: {
    interestedInInvesting: Boolean,

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },

    assets: {
      mutualFunds: { type: Boolean, default: false },
      stocks: { type: Boolean, default: false },
      fixedDeposits: { type: Boolean, default: false },
      crypto: { type: Boolean, default: false },
    },
  },

  //LIABILITIES
  liabilities: {
    hasLoans: { type: Boolean, default: false },
    emiAmount: { type: Number, default: 0 },
  },

  //INSURANCE
  insurance: {
    hasHealthInsurance: { type: Boolean, default: false },
    hasLifeInsurance: { type: Boolean, default: false },
  },

  //BEHAVIOR
  behavior: {
    spending: {
      type: String,
      enum: ["low", "moderate", "high"],
    },
    saving: {
      type: String,
      enum: ["low", "moderate", "high"],
    },
  },

  //CREDIT PROFILE
  credit: {
    hasCreditCard: { type: Boolean, default: false },
    creditScore: {
      type: Number,
      min: 300,
      max: 900,
    },
  },

  //TAX/COMPLIANCE
  compliance: {
    filesITR: { type: Boolean, default: false },
  },

  //AI INSIGHTS
  insights: {
    riskProfile: {
      type: String,
      enum: ["low", "moderate", "high"],
    },

    financialHealthScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    gaps: [String],

    recommendations: [String],
  },

  //TIMESTAMPS
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update timestamp
userProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
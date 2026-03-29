import express from 'express';
import cors from 'cors';
import UserProfile from './models/UserProfile.js';
import chatRoutes from './routes/ChatRoutes.js'
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running ");
});

// Create / Save Profile
app.post("/api/profile", async (req, res) => {
  console.log("API HIT ");   

  try {
    const profile = await UserProfile.create(req.body);

    console.log("DATA SAVED ");  

    res.json({
      message: "Profile saved successfully",
      profile,
    });

  } catch (err) {
    console.error("ERROR ", err);
    res.status(500).json({ error: err.message });
  }
});
app.use("/api/chat",chatRoutes);
export default app;
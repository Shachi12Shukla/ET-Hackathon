import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO_URI); 

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB ERROR", err);
  }
};

export default connectDB;
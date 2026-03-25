import mongoose from "mongoose";

let isConnected = false; // 🔥 important for Vercel

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ Using existing DB connection");
    return;
  }

  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ Mongo connected");

  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
};

export default connectDB;
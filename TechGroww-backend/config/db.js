import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 👇 SABSE PEHLE YE PRINT KAR
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Mongo connected");

    mongoose.connection.on("connected", () => {
      console.log("🟢 DB connection event triggered");
    });

    mongoose.connection.on("error", (err) => {
      console.log("🔴 MongoDB error:", err);
    });

  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
};

export default connectDB;
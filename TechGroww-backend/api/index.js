import express from 'express';
import apiroutes from '../routes/apiroutes.js';
import connectDB from '../config/db.js';
import contactRoute from '../routes/contactRoute.js';
import authRoutes from '../routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api', apiroutes);
app.use('/api', contactRoute);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("Hello from server");
});

// 🔥 IMPORTANT: DB connect inside handler (Vercel fix)
export default async function handler(req, res) {
  console.log("🚀 Request received");

  await connectDB(); // 👈 har request pe ensure connection

  return app(req, res);
}
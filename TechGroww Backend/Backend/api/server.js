import express from 'express'
import apiroutes from '../Routes/apiroutes.js'
import connectDB from '../config/db.js';
import contactRoute from '../Routes/contactRoute.js'
import authRoutes from '../Routes/authRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())

connectDB()

app.use('/api', apiroutes)
app.use('/api', contactRoute)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.listen(PORT, ()=>{
    console.log("Server started on port 3000");
})
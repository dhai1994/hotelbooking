import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary();

const app = express();

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://yostay.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Important for cookies / bearer tokens
}));


// Middleware 
app.use(clerkMiddleware());
app.use(express.json());

// API to listen to Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.end("API is working")); 
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/owner', roomRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

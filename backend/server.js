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

// Disable ETags so Express won't send 304 for unchanged responses
app.disable('etag');

// Force no caching for API responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});


// Replace * with your front-end origin
const allowedOrigin = 'http://localhost:5173';

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


// Middleware 
app.use(clerkMiddleware());
app.use(express.json());


app.use((req, _res, next) => {
  const tokenPreview = req.headers.authorization
    ? req.headers.authorization.slice(0, 25) + '...'
    : 'none';
  console.log(`${req.method} ${req.originalUrl} auth=${tokenPreview}`);
  next();
});

// API to listen to Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.end("API is working")); 
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/owner', roomRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

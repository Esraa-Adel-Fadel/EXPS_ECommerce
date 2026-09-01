import express, { NextFunction, type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { AppError } from './utils/appError.js';

dotenv.config();
const app: Express = express();
const port=process.env.PORT || 5000;
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(port, ()=>{
    console.log(`I'm listening to port ${port}`);
})
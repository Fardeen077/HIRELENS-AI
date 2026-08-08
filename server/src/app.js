import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import resumeRouter from "./routers/resume.router.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import cors from "cors"

dotenv.config({ path: "./.env" });
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resume", resumeRouter);
app.use(errorHandler);

export default app;
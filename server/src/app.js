import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import router from "./routers/user.router.js";

dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", router);

export default app;
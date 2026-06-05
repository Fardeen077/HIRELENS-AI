import dotenv from "dotenv"
import express from "express"
import router from "./routers/user.router.js";

dotenv.config({ path: "./.env" });
const app = express();

app.use("/api/v1/user", router);

export default app;
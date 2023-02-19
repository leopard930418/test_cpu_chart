import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import dao from "./repositories/dao";
import { authenticated, authMiddleware } from "./controllers/auth.controller";
import authRoutes from "./routes/auth.routes";
import itemsRoutes from "./routes/items.routes";
import dataRoutes from "./routes/data.routes";

const port = 8080;
export const app = express();

app.listen(port, () => console.log(`Backend is running on port ${port}!`));
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use("/api/auth", authRoutes);
app.use("/api/items", authenticated, itemsRoutes);
app.use("/api/data", dataRoutes);

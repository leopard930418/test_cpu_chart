import { getData } from "../controllers/data.controller";
import * as express from "express";
const router = express.Router();

router.get("/", getData);

export default router;

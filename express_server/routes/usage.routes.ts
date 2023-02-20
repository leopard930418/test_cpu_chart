import usageController from "../controllers/usage.controller";
import * as express from "express";
const router = express.Router();

router.get("/getData", usageController.getAllUsages);
router.post("/getData", usageController.createUsage);
router.put("/getData", usageController.updateusage);
router.delete("/getData:id", usageController.deleteUsage);
router.get("/getData:id", usageController.getusageById);

export default router;

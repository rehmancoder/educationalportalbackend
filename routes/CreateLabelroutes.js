import { Router } from "express";
import {
  createLabel,
  getCreateLabel,
  deleteAllLabels,
} from "../Controller/CreateLabel.js";

const router = Router();
router.post("/", createLabel);
router.get("/", getCreateLabel);
router.delete("/", deleteAllLabels);
export default router;

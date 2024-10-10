import { Router } from "express";
import {
  labelData,
  getLabelData,
  deleteLabel,
} from "../Controller/LabelController.js";

const router = Router();

router.post("/", labelData);
router.get("/", getLabelData);
router.delete("/:TrackingId", deleteLabel);
export default router;

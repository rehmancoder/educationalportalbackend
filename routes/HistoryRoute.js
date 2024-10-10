import { Router } from "express";
import { history, getHistory } from "../Controller/HistoryControler.js";

const router = Router();

router.post("/", history);
router.get("/", getHistory);
export default router;

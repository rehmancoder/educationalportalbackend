import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import StudentRoutes from "./studentRoutes.js";
import CurrentUserRoute from "./currentUserRoute.js";
import HistoryRoute from "./HistoryRoute.js";
import LabelRoute from "./LabelRoute.js";
import CreateLabelRoute from "./CreateLabelroutes.js";

const router = Router();
router.use("/api/user", UserRoutes);
router.use("/api/student", StudentRoutes);
router.use("/api", CurrentUserRoute);
router.use("/api/history", HistoryRoute);
router.use("/api/labelData", LabelRoute);
router.use("/api/createLabel", CreateLabelRoute);

export default router;

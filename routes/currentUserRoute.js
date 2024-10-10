import { currentUser } from "../Controller/UserController.js";
import { Router } from "express";
import authenticateToken from "../middleware.js";

const router=Router()
router.get("/currentuser",authenticateToken,currentUser)

export default router
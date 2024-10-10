import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  teacherLogin,
  getStudentsOfTeacher,
  teacherLogout,
  markAttendance,
  updateAttendance,
} from "../Controller/UserController.js";
const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/login", teacherLogin);
router.get("/:id/students", getStudentsOfTeacher);
router.post("/attendance", markAttendance);
router.put("/attendance/:id", updateAttendance);

// router.post("/logout", teacherLogout);

export default router;

import { Router } from "express";

import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "../Controller/StudentController.js";
const router = Router();

router.post("/", createStudent);
router.put("/:id", updateStudent);
router.get("/", getStudents);
router.get("/:id", getStudent);
router.delete("/:id", deleteStudent);

// router.post('/login',teacherLogin)

export default router;

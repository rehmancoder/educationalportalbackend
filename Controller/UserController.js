import prisma from "../db/db.config.js";
import jwt from "jsonwebtoken";

// const cookieParser = require('cookie-parser');
// create user
export const createUser = async (req, res) => {
  const { name, email, password, balance } = await req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send({ msg: "user already existed" });
    }
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        balance: balance,
      },
    });
    return res.status(200).send({
      data: newUser,
      msg: "user created successfully",
    });
  } catch (error) {
    return res.status(404).json({ msg: "error occured while creating a user" });
  }
};
// update user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, balance } = await req.body;
  try {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name: name,
        email: email,
        password: password,
        balance: balance,
      },
    });
    return res.status(200).json({ msg: "data updated successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error occured while updating users" });
  }
};
// get all users

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res
      .status(200)
      .json({ data: users, msg: "user fetched successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ msg: "error while fetching users" });
  }
};

// get a single user

export const getUser = async (req, res) => {
  const userId = await req.params.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    return res
      .status(200)
      .send({ data: user, msg: "user fetched successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error while fetching a user" });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  const userId = await req.params.id;
  try {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    return res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error while deleting a user" });
  }
};

// teacher login api
export const teacherLogin = async (req, res) => {
  // const userId = req.params.id;
  const { email, password } = await req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    // console.log(user);
    if (user == null) {
      return res
        .status(404)
        .json({ msg: "user not found, Please try with correct credentials" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    // console.log(token);
    // res.cookie("authToken", token, { expiresIn:"1d", httpOnly: true });

    return res
      .status(200)
      .json({ msg: "user logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "error occured during logging in" });
  }
};
// teacher logout api
export const teacherLogout = async (req, res) => {
  try {
    localStorage.clear();
    return res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    console.log("error in login out", error);
    return res.status(401).json({ msg: "error occured during logging out" });
  }
};
// current user logged In

export const currentUser = async (req, res) => {
  try {
    const user = req.user;
    const actualUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    // console.log(actualUser);
    // console.log(user);
    // const exactUser=await prisma.user.

    return res.status(200).send({ actualUser });
  } catch (error) {
    return res
      .status(401)
      .send({ msg: "current user not found from the token" });
  }
};

//get all students of a perticular teacher
export const getStudentsOfTeacher = async (req, res) => {
  const userId = req.params.id;

  try {
    const teachersStudents = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
      include: {
        student: true, // Ensure this is the correct relation name
      },
    });

    if (!teachersStudents) {
      return res.status(404).send({ msg: "Teacher not found" });
    }

    return res.status(200).send({
      msg: "Students of teacher fetched successfully",
      data: teachersStudents,
    });
  } catch (error) {
    console.error("Error fetching students of teacher:", error);
    return res.status(500).send({
      msg: "Error in fetching students of teacher",
      error: error.message,
    });
  }
};

// mark students attendence
export const markAttendance = async (req, res) => {
  const { studentId, status } = req.body;
  const now = new Date();

  try {
    // Check if the student exists
    const studentExists = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
    });

    if (!studentExists) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if there is already an attendance record for the student within the last 24 hours
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000); // current time sy 24 hours minus kry ga
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId: parseInt(studentId),
        createdAt: {
          gte: last24Hours,
        },
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ error: "Attendance already marked within the last 24 hours" });
    }

    // Create the attendance record
    const attendance = await prisma.attendance.create({
      data: {
        status: status,
        studentId: parseInt(studentId),
        createdAt: now,
      },
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error , error in arking attendence" });
  }
};
// update attendance after 1 hour of attendance
export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const now = new Date();

  try {
    // Find the attendance record
    const attendance = await prisma.attendance.findUnique({
      where: { id: parseInt(id) },
    });

    if (!attendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    // Check if the record is editable (within 1 hour)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    if (attendance.createdAt < oneHourAgo) {
      return res
        .status(403)
        .json({ error: "Attendance record cannot be edited after 1 hour" });
    }

    // Update the attendance record
    const updatedAttendance = await prisma.attendance.update({
      where: { id: parseInt(id) },
      data: { status, updatedAt: now },
    });

    res.json(updatedAttendance);
  } catch (error) {
    return res.status(400).send({ msg: "error in updating attendance" });
  }
};

import prisma from "../db/db.config.js";
import jwt from "jsonwebtoken";

// create user
export const createStudent = async (req, res) => {
  const { Weight, ToName, FromName } = await req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: Number(user_id),
      },
    });
    if (existingUser) {
      return res.status(400).send({ msg: "user already existed" });
    }
    const newStudent = await prisma.user.create({
      data: {
        FromName: FromName,
        ToName: ToName,
        Weight: Weight,
        user_id: user_id,
      },
    });
    return res.status(200).send({
      data: newStudent,
      msg: "Student_Data created successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "error occured while creating a Student" });
  }
};

// update user
export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, email, section, user_id } = await req.body;
  try {
    await prisma.student.update({
      where: {
        id: Number(studentId),
      },
      data: {
        user_id: user_id,
        name: name,
        email: email,
        section: section,
      },
    });
    return res.status(200).json({ msg: "data updated successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error occured while updating users" });
  }
};
// get all users

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { attendance: true, user: true },
    });
    return res
      .status(200)
      .json({ data: students, msg: "students fetched successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ msg: "error while fetching students" });
  }
};

// get a single user

export const getStudent = async (req, res) => {
  const studentId = await req.params.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(studentId),
      },
    });
    if (!user) {
      return res.status(400).json({ msg: "student not found" });
    }
    return res
      .status(200)
      .send({ data: user, msg: "student fetched successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error while fetching a student" });
  }
};

// delete user

export const deleteStudent = async (req, res) => {
  const studentId = await req.params.id;
  try {
    await prisma.student.delete({
      where: {
        id: Number(studentId),
      },
    });
    return res.status(200).json({ msg: "student deleted successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "error while deleting a student" });
  }
};

// image storing

// // Student login api
// export const studentLogin = async (req, res) => {
//     // const userId = req.params.id;
//     const { email, password } = await req.body;

//     try {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: email,
//           password: password,
//         },
//       });
//       // console.log(user);
//       if (user == null) {
//         return res
//           .status(404)
//           .json({ msg: "user not found, Please try with correct credentials" });
//       }
//       const token = jwt.sign(
//         {
//           id: user.id,
//           name: user.name,
//         },
//         process.env.JWT_KEY
//       );

//       console.log(token);
//       res.cookie("authToken", token, { maxAge: 92160000, httpOnly: true });

//       return res.status(200).json({ msg: "user logged in successfully" });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ msg: "error occured during logging in" });
//     }
//   };

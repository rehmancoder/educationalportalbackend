// main.js or app.js
import express from "express";
import "dotenv/config";
import routes from "./routes/index.js"; // Main routes file
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to your frontend's origin
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json()); // Allows Express to parse JSON bodies

// Use the routes
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// try {
//   await prisma.$connect();
//   console.log("Database connected successfully!");
// } catch (error) {
//   console.error("Database connection error:", error);
// }

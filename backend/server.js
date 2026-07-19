import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import questRoutes from "./routes/questRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Questify Backend Running 🚀");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

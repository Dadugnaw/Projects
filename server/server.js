const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
// app.use("/api/members", require("./routes/members"));
// app.use("/api/memberships", require("./routes/memberships"));
// app.use("/api/payments", require("./routes/payments"));
// app.use("/api/attendance", require("./routes/attendance"));

// Basic Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Gym MVP Server Running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

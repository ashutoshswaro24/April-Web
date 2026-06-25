const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Professional responsive websites",
  },
  {
    id: 2,
    title: "App Development",
    description: "Android and iOS applications",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "SEO and Social Media Marketing",
  },
];

app.get("/", (req, res) => {
  res.send("Outpro Backend is Running Successfully 🚀");
});

app.get("/api/services", (req, res) => {
  res.json(services);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
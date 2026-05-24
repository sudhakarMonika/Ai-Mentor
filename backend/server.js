import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB, sequelize } from "./config/db.js";

/* ROUTES */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import sidebarRoutes from "./routes/sidebarRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import paymentRoutes from "./routes/payment.js";
import razorpayRoutes from "./routes/razorpay.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
<<<<<<< HEAD
import contactUsRoutes from "./routes/contactus.js";
=======
import contactUsRoutes from "./routes/contactus.js"; // ✅ fixed import
import reportRoutes from "../backend/routes/reportRoutes.js";
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

/* MODELS */
import "./models/CommunityPost.js";
import "./models/Notification.js";
import "./models/Report.js";
import "./models/modelAssociations.js";
import "./models/contactMessage.js";

dotenv.config();

<<<<<<< HEAD
const app = express();
=======
import { validateEnv } from "./env-validator.js";
validateEnv();
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= CORS FIX ================= */
app.use(
  cors({
<<<<<<< HEAD
    origin: "http://localhost:5173",
=======
    origin: [process.env.FRONTEND_URL || "http://localhost:5173", "http://localhost:5174"],
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 IMPORTANT: preflight support */
app.options("*", cors());

/* ================= BODY PARSER ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DEBUG LOGGER ================= */
app.use((req, res, next) => {
  console.log(`👉 ${req.method} ${req.url}`);
  next();
});

/* ================= STATIC FILES ================= */
app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API running 🚀",
  });
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/payment/razorpay", razorpayRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/sidebar", sidebarRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/preferences", preferenceRoutes);
<<<<<<< HEAD
app.use("/api/contactus", contactUsRoutes);
=======
app.use("/api/contactus", contactUsRoutes); // ✅ added route
app.use("/api/coures-reports", reportRoutes);
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB Connected");

<<<<<<< HEAD
    await sequelize.sync();
    console.log("✅ Sequelize synced");
=======
    const isDevelopment = process.env.NODE_ENV !== "production";
    const syncOptions = isDevelopment ? { alter: true } : {};
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

    await sequelize.sync(syncOptions);
    console.log(
      isDevelopment
        ? "✅ Database models synced with schema auto-alter enabled (development)"
        : "✅ Database models synced",
    );
    app.listen(PORT, () => {
      console.log(`🚀 Server running: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server Start Error:", error);
  }
};

startServer();
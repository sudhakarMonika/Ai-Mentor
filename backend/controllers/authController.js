import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { ensureProfileCompleteness, formatFullName } from "../utils/userUtils.js";
import cloudinary from "../config/cloudinary.js";

/* ================= TOKEN ================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

<<<<<<< HEAD
/* ================= REGISTER ================= */
=======
// Centralized logic moved to userUtils.js

>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("👉 REGISTER BODY:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ❗ DO NOT HASH HERE (handled by Sequelize hook)
    const user = await User.create({
      name: formatFullName(name, ""), // Standard register provides 'name', we treat as first part if needed
      email,
      password,
    });

<<<<<<< HEAD
    return res.status(201).json({
      success: true,
      token: generateToken(user.id),
      user: {
=======
    await ensureProfileCompleteness(user);

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar_url: user.avatar_url,
      isProfileComplete: user.isProfileComplete,
      googleId: user.googleId,
      hasPassword: !!user.password,
      purchasedCourses: user.purchasedCourses,
      isNewUser: true,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("User not found in DB.");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (user && user.password && isMatch) {
      console.log("Login successful!");
      await ensureProfileCompleteness(user);
      
      res.json({
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
<<<<<<< HEAD
        isProfileComplete: user.isProfileComplete,
      },
    });
=======
        bio: user.bio,
        avatar_url: user.avatar_url,
        isProfileComplete: user.isProfileComplete,
        googleId: user.googleId,
        hasPassword: !!user.password,
        purchasedCourses: user.purchasedCourses,
        isNewUser: false,
        token: generateToken(user.id),
      });
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9

  } catch (error) {
    console.error("❌ Register Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Background task to refresh/re-host avatar to Cloudinary without blocking login
const refreshAvatarInBackground = async (userId, googlePictureUrl) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.warn(`Skipping background avatar refresh because user ${userId} was not found`);
      return;
    }

    const result = await cloudinary.uploader.upload(googlePictureUrl, {
      folder: "user_avatars",
      public_id: `user_${userId}`,
      overwrite: true,
    });

    // Persist the new permanent Cloudinary URL, then recompute profile completeness
    user.avatar_url = result.secure_url;
    await user.save();
    await ensureProfileCompleteness(user);
    console.log(`Successfully refreshed/re-hosted avatar to Cloudinary for user ${userId}`);
  } catch (err) {
    console.error("Background avatar refresh failed:", err);
  }
};

/* ================= LOGIN (FINAL FIXED + DEBUG) ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("👉 LOGIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔥 DEBUG LOGS (IMPORTANT)
    console.log("🔐 RAW INPUT PASSWORD:", JSON.stringify(password));
    console.log("🗄 DB PASSWORD:", user.password);

    // 🔥 FIX: trim input password
    const cleanPassword = password.trim();

    const isMatch = await bcrypt.compare(cleanPassword, user.password);

    console.log("✅ BCRYPT RESULT:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
      },
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GOOGLE LOGIN ================= */
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    const payload = JSON.parse(
      Buffer.from(idToken.split(".")[1], "base64").toString()
    );

<<<<<<< HEAD
=======
    // console.log("Google Login Payload:", JSON.stringify(payload, null, 2));
    const uid = payload.sub;
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    const email = payload.email;
    const name = payload.name || email.split("@")[0];
    let firstName = payload.given_name || "";
    let lastName = payload.family_name || "";
    const avatar_url = payload.picture || null;

    // Fallback if given_name and family_name are missing
    if (!firstName && !lastName && name) {
      const nameParts = name.trim().split(/\s+/);
      firstName = nameParts[0] || "";
      lastName = nameParts.slice(1).join(" ") || "";
    }
    const fullName = formatFullName(firstName, lastName);

    let user = await User.findOne({ where: { email } });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await User.create({
        name: fullName,
        email,
<<<<<<< HEAD
        password: null,
=======
        firstName,
        lastName,
        avatar_url,
        googleId: uid,
        role: "user",
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
      });
    } else {
      let changed = false;
      if (!user.googleId) {
        user.googleId = uid;
        changed = true;
      }

      // Pre-fill missing names/avatar from Google if they are empty
      if (!user.firstName && firstName) {
        user.firstName = firstName;
        changed = true;
      }
      if (!user.lastName && lastName) {
        user.lastName = lastName;
        changed = true;
      }
      if (!user.avatar_url && avatar_url) {
        user.avatar_url = avatar_url;
        changed = true;
      }
      
      // Update name if components changed
      if (changed) {
        user.name = formatFullName(user.firstName, user.lastName);
        await user.save();
      }
    }

    await ensureProfileCompleteness(user);

    // 🔥 OPTIMIZATION: Flicker-Free Avatar Re-hosting
    if (avatar_url) {
      const isCurrentlyGoogleHosted = user.avatar_url?.includes("googleusercontent.com");
      const isMissing = !user.avatar_url;

      if (isNewUser) {
        // For new users, we wait (sync) to ensure their first impression is perfect and initials don't flicker
        try {
          const result = await cloudinary.uploader.upload(avatar_url, {
            folder: "user_avatars",
            public_id: `user_${user.id}`,
            overwrite: true,
          });
          user.avatar_url = result.secure_url;
          await user.save();
        } catch (err) {
          console.error("Sync avatar re-hosting failed:", err);
          // Fallback: the response will still use the Google URL if Cloudinary fails
        }
      } else if (isCurrentlyGoogleHosted || isMissing) {
        // For returning users, keep it backgrounded (async) to maintain instant speed
        refreshAvatarInBackground(user.id, avatar_url);
      }
    }

<<<<<<< HEAD
    return res.json({
      success: true,
      token: generateToken(user.id),
      user,
=======
    const token = generateToken(user.id);

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar_url: user.avatar_url,
      isProfileComplete: user.isProfileComplete,
      googleId: user.googleId,
      hasPassword: !!user.password,
      purchasedCourses: user.purchasedCourses,
      isNewUser,
      token,
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    });

  } catch (error) {
    console.error("❌ Google Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

/* ================= FORGOT PASSWORD ================= */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: resetUrl,
    });

    return res.json({
      success: true,
      message: "Reset email sent",
    });

  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= RESET PASSWORD ================= */
const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = req.body.password; // hook will hash it
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
};
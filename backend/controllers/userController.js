import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { ensureProfileCompleteness, formatFullName } from "../utils/userUtils.js";
import { createNotification } from "./notificationController.js";


/* ================= REGISTER USER ================= */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, name, email, password } = req.body;

    console.log("REGISTER BODY:", req.body);

    // check existing user
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      firstName,
      lastName,
      name,
      email,
      password: hashedPassword,
      isProfileComplete: false,
    });

    // generate token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
<<<<<<< HEAD
      isProfileComplete: false,
=======
      role: user.role,
      bio: user.bio,
      avatar_url: user.avatar_url,
      isProfileComplete: user.isProfileComplete,
      purchasedCourses: user.purchasedCourses,
      isNewUser: true,
      token: generateToken(user.id),
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

<<<<<<< HEAD
/* ================= LOGIN USER ================= */
export const loginUser = async (req, res) => {
=======
// Centralized logic moved to userUtils.js

// @desc Login user
const loginUser = async (req, res) => {
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
<<<<<<< HEAD
=======
      isGoogleUser: !!user.googleId,
      googleId: user.googleId,
      hasPassword: !!user.password,
      purchasedCourses: user.purchasedCourses,
      isNewUser: false,
      token: generateToken(user.id),
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ================= COMPLETE PROFILE ================= */
export const completeProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, bio } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    if (bio) user.bio = bio;

    // avatar upload
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_avatars",
          public_id: `user_${user.id}`,
          overwrite: true,
        });

        user.avatar_url = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cloudinary error:", err.message);
      }
    }

    user.isProfileComplete = true;

    await user.save();

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar_url: user.avatar_url,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Profile update failed",
    });
  }
};

/* ================= OTHER APIs (PLACEHOLDERS) ================= */

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

<<<<<<< HEAD
    res.json(user);
=======
    const purchasedCourses = user.purchasedCourses || [];

    // Prevent duplicate enrollment
    const alreadyPurchased = purchasedCourses.some(
      (c) => Number(c.courseId) === Number(courseId)
    );

    if (alreadyPurchased) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Add course
    purchasedCourses.push({
      courseId: Number(courseId),
      courseTitle: courseTitle || "Course",
      purchaseDate: new Date(),
      progress: {
        completedLessons: [],
        currentLesson: null,
      },
    });

    user.purchasedCourses = purchasedCourses;

    // Important for Sequelize JSON/JSONB update
    user.changed("purchasedCourses", true);

    await user.save();
    await createNotification(user.id, {
      title: "Course Enrolled 🎉",
      message: `You successfully enrolled in ${courseTitle || "a course"}`,
      type: "course",
      metadata: { courseId },
    });

    res.status(200).json({
      message: "Course enrolled successfully",
      purchasedCourses: user.purchasedCourses,
    });
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  res.json({ message: "Profile updated" });
};

export const changePassword = async (req, res) => {
  res.json({ message: "Password updated" });
};

export const purchaseCourse = async (req, res) => {
  res.json({ message: "Course purchased" });
};

export const updateCourseProgress = async (req, res) => {
  res.json({ message: "Progress updated" });
};

<<<<<<< HEAD
export const getWatchedVideos = async (req, res) => {
  res.json({ message: "Watched videos" });
=======
const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Avatar Upload Handling
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_avatars",
        public_id: `user_${user.id}`,
        overwrite: true,
      });

      user.avatar_url = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    // Update text fields
    user.firstName = req.body.firstName ?? user.firstName;
    user.lastName = req.body.lastName ?? user.lastName;
    user.name = formatFullName(user.firstName, user.lastName);
    user.email = req.body.email ?? user.email;
    user.bio = req.body.bio ?? user.bio;

    await user.save();

    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar_url: user.avatar_url,
      isProfileComplete: user.isProfileComplete,
      isGoogleUser: !!user.googleId,
      hasPassword: !!user.password,
      purchasedCourses: user.purchasedCourses,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
};

export const removePurchasedCourse = async (req, res) => {
  res.json({ message: "Course removed" });
};

<<<<<<< HEAD
export const getUserSettings = async (req, res) => {
  res.json({ message: "Settings data" });
=======
// Delete User Account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    try {
      const avatarPublicId = `user_avatars/user_${userId}`;
      await cloudinary.uploader.destroy(avatarPublicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary avatar deletion error:", cloudinaryError);
    }

    await CommunityPost.destroy({
      where: { userId },
    });

    await Notifications.destroy({
      where: { userId },
    });

    await User.destroy({
      where: { id: userId },
    });

    res.status(200).json({
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Account Error", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
}
// Complete first-time user profile onboarding
// Google users: firstName, lastName, password (required), bio, avatar
// Email users: bio, avatar
const completeProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent re-completion for already completed profiles
    if (user.isProfileComplete) {
      // Return gracefully instead of erroring, letting the frontend handle redirection
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatar_url: user.avatar_url,
        isProfileComplete: user.isProfileComplete,
        purchasedCourses: user.purchasedCourses,
      });
    }

    const { firstName, lastName, password, bio } = req.body;

    // Apply missing fields if provided
    if (firstName && firstName.trim() !== '') {
      user.firstName = firstName;
    }
    if (lastName && lastName.trim() !== '') {
      user.lastName = lastName;
    }
    if (user.firstName || user.lastName) {
      user.name = formatFullName(user.firstName, user.lastName);
    }
    if (password && password.length >= 6 && !!user.googleId) {
      user.password = password; // strictly handled by beforeSave hook!
    }

    // All users: bio (required if not already set)
    if (bio && bio.trim().length > 0) {
      user.bio = bio;
    } else if (!user.bio || user.bio.trim().length === 0) {
      return res.status(400).json({ message: "Bio is required" });
    }

    // Avatar upload via Cloudinary (required if not already set)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_avatars",
        public_id: `user_${user.id}`,
        overwrite: true,
      });
      user.avatar_url = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else if (!user.avatar_url) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    user.isProfileComplete = true; // Temporary flag to trigger save check
    await user.save();

    // Final safety check: if the hook found it's STILL incomplete, return a list of missing fields.
    if (!user.isProfileComplete) {
      const missingFields = [];
      if (!user.firstName) missingFields.push("First Name");
      if (!user.lastName) missingFields.push("Last Name");
      if (!user.bio) missingFields.push("Bio");
      if (!user.avatar_url) missingFields.push("Profile Photo");
      if (user.googleId && !user.password) missingFields.push("Password");

      return res.status(400).json({
        message: `Profile is still incomplete. Missing: ${missingFields.join(", ")}`,
        missingFields
      });
    }

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
      isGoogleUser: !!user.googleId,
      googleId: user.googleId,
      hasPassword: !!user.password,
      purchasedCourses: user.purchasedCourses,
    });
  } catch (error) {
    console.error("COMPLETE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
};

export const updateUserSettings = async (req, res) => {
  res.json({ message: "Settings updated" });
};

export const deleteAccount = async (req, res) => {
  res.json({ message: "Account deleted" });
};
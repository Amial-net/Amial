const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

const isRpiEmail = (email) => {
  return /^[A-Za-z0-9._%+-]+@rpi\.edu$/i.test(email);
};

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    let { email, username, password } = req.body;

    email = email?.trim().toLowerCase();
    username = username?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, username, and password are required.",
      });
    }

    if (!isRpiEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "You must use a valid RPI email ending in @rpi.edu.",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "That email is already registered.",
        });
      }

      if (existingUser.username === username) {
        return res.status(409).json({
          success: false,
          message: "That username is already taken.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    req.session.user = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    };

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
});

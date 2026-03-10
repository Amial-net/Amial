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

    //stores user in a session (For cookie session later to identify who is in the current session to stay logged in)
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

router.post("/login", async (req, res) => {
  try {
    let { identifier, password } = req.body;

    identifier = identifier?.trim().toLowerCase();
    password = password?.trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Identifier and password are required.",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Could not log out.",
      });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});

module.exports = router;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const generateOtp = require("../utils/generateOtp");

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { username, useremail, userpassword, userphone } = req.body;

    if (!username || !useremail || !userpassword || !userphone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const otp = generateOtp();
    req.session.OTP = otp;
    req.session.OTP_EXPIRE = Date.now() + 1 * 60 * 1000;
    req.session.userDtails = req.body;

    await sendEmail(useremail, otp);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.log("signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, userpassword } = req.body;

    const isUserExist = await User.findOne({ username });

    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      userpassword,
      isUserExist.userpassword,
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    req.session.loginId = isUserExist._id;
    req.session.username = isUserExist.username;

    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.log("login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/auth/verify-otp
const verifyOtp = async (req, res) => {
  try {
    const userotp = Number(req.body.userotp.join(""));
    const actualotp = req.session.OTP;
    const otpExpireTime = req.session.OTP_EXPIRE;

    if (!actualotp || !otpExpireTime) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired, please sign up again" });
    }

    if (Date.now() > otpExpireTime) {
      req.session.OTP = null;
      req.session.OTP_EXPIRE = null;
      return res
        .status(400)
        .json({ success: false, message: "OTP expired, please resend" });
    }

    if (userotp !== actualotp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const { username, useremail, userpassword, userphone } =
      req.session.userDtails;

    const hashpassword = await bcrypt.hash(userpassword, 10);

    await User.create({
      username,
      useremail,
      userpassword: hashpassword,
      userphone,
    });

    req.session.OTP = null;
    req.session.userDtails = null;
    req.session.OTP_EXPIRE = null;

    return res.json({ success: true, message: "Registration done" });
  } catch (err) {
    console.log("verifyOtp error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/auth/resend-otp
const resendOtp = async (req, res) => {
  try {
    if (!req.session.userDtails) {
      return res
        .status(400)
        .json({ success: false, message: "Session expired, please sign up again" });
    }

    const otp = generateOtp();
    req.session.OTP = otp;
    req.session.OTP_EXPIRE = Date.now() + 60 * 1000;

    const { useremail } = req.session.userDtails;
    await sendEmail(useremail, otp);

    return res.json({ success: true, message: "New OTP sent successfully" });
  } catch (err) {
    console.log("resendOtp error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/auth/dashboard
const dashboard = async (req, res) => {
  return res.json({ success: true, username: req.session.username });
};

// GET /api/auth/messages
const messages = async (req, res) => {
  return res.json({ success: true, messages: [] });
};

// GET /api/auth/logout
const logout = async (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
};

module.exports = {
  signup,
  login,
  verifyOtp,
  resendOtp,
  dashboard,
  messages,
  logout,
};

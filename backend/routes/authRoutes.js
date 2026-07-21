const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyOtp,
  resendOtp,
  dashboard,
  messages,
  logout,
} = require("../controllers/authController");

const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

router.get("/dashboard", isLoggedIn, dashboard);
router.get("/messages", isLoggedIn, messages);
router.get("/logout", logout);

module.exports = router;

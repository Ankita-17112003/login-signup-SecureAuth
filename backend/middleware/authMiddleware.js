const isLoggedIn = (req, res, next) => {
  if (!req.session.loginId) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  next();
};

module.exports = { isLoggedIn };

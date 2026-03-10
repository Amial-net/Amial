function requireVerifiedEmail(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
  }

  if (!req.session.emailVerified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required for this session.",
    });
  }

  next();
}

module.exports = requireVerifiedEmail;
//route for protection when not logged in 
//I.E: trying to access /home when your not logged in this will prevent it.
function ensureAuthenticated(req, res, next) {
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

module.exports = { ensureAuthenticated };
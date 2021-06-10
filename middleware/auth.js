const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

module.exports.auth = async (req, res, next) => {
  if (req.signedCookies) {
    try {
      const token = req.signedCookies["auth"];
      const verified = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verified.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.send("Unauthorized access").status(401);
  }
};

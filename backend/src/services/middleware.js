require("dotenv").config();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
    } catch (err) {
      res.status(403).json({ status: "error", message: "token expired" });
    }
  } else {
    return res.status(401).json({
      status: "error",
      message: "Authorization required",
    });
  }
  next();
};

module.exports = { requireSignin };

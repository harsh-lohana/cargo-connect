const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401).send("User not found");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role === 0)
    return next();
  return res.status(401).send('Access denied, you must be admin');
}

const isTrucker =  (req, res, next) => {
  if (req.user.role === 1)
    return next();
  return res.status(401).send('Access denied, you must be trucker');
}

const isCustomer = async (req, res, next) => {
  if (req.user.role === 2)
    return next();
  return res.status(401).send('Access denied, you must be customer');
}

module.exports = { protect, isAdmin, isTrucker, isCustomer };

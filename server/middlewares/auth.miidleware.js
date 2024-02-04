const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403);
  }
};

const isAdmin = async(req,res,next) => {
  if(req.user.role !== 0){
    return res.status(401).send('Access denied, you must be admin');
  }
}

module.exports = { authMiddleware, isAdmin};

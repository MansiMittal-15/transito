import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next)=>{
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "User not authorized!",
      });
    }
    const token = await authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
      return res.status(403).json({
        message: "User not authorized!",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
}
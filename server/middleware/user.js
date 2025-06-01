import jwt from "jsonwebtoken";
import User from "../model/authModel.js";

export const userAuth = async (req, res, next) => {
  try {
    const { userSession } = req.cookies;
    if (!userSession)
      return res.status(400).json({ error: "No token provided" });

    const decoded = jwt.verify(userSession, process.env.jwtSecret);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (e) {
    console.log("error in user middleware");
    return res.status(500).json({ error: e.message });
  }
};

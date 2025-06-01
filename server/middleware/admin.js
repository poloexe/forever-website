import jwt from "jsonwebtoken";

export const admin = async (req, res, next) => {
  try {
    const { userSession } = req.cookies;
    if (!userSession) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(userSession, process.env.jwtSecret);
    if (!decoded) return res.status(401).json({ msg: "Invalid token" });

    if (decoded.role !== "admin")
      return res.status(403).json({ msg: "Access denied: Admin users only" });
    req.adminuser = decoded;
    next();
  } catch (e) {
    console.log("Error in admin middleware");
    return res.status(500).json({ msg: e.message });
  }
};

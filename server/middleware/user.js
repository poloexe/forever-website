import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const { userSession } = req.cookies;
    if (!userSession) return res.status(400).json({ msg: "No token provided" });

    const decoded = jwt.verify(userSession, process.env.jwtSecret);
    if (!decoded) return res.status(401).json({ msg: "Invalid token" });

    req.user = decoded;

    next();
  } catch (e) {
    console.log("error in user middleware");
    return res.status(500).json({ msg: e.message });
  }
};

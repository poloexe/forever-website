import User from "../model/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, role } = req.body;

    if (!fullname || !email || !password || !confirmPassword)
      return res.status(400).json({ msg: "Ouch! Some fields are empty" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Please input a valid email" });

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ msg: "Email already exists" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Password must match!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.jwtSecret,
        {
          expiresIn: "1d",
        }
      );

      const secure = process.env.NODE_ENV !== "development";

      res.setHeader(
        "Set-Cookie",
        `userSession=${token}; Max-Age=86400; HttpOnly; Path=/; SameSite=None; ${
          secure ? "Secure" : ""
        }; Partitioned`
      );

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        cartData: newUser.cartData,
        role: newUser.role,
      });
    }
  } catch (e) {
    console.log("Error at register ");
    return res.status(500).json({ msg: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Ouch! Some fields are empty" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Please input a valid email" });

    const userExists = await User.findOne({ email, role: "user" });
    if (!userExists)
      return res.status(400).json({ msg: "No User Found, Register" });

    const isMatch = await userExists.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: userExists._id, role: userExists.role },
      process.env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    const secure = process.env.NODE_ENV !== "development";

    res.setHeader(
      "Set-Cookie",
      `userSession=${token}; Max-Age=86400; HttpOnly; Path=/; SameSite=None; ${
        secure ? "Secure" : ""
      }; Partitioned`
    );

    return res.status(200).json({
      success: true,
      _id: userExists._id,
      fullname: userExists.fullname,
      email: userExists.email,
      cartData: userExists.cartData,
      role: userExists.role,
    });
  } catch (e) {
    console.log("error in login");
    return res.status(500).json({ msg: e.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Ouch! Some fields are empty" });

    const user = await User.findOne({ email, role: "admin" });

    const isMatch = user && (await user.comparePassword(password));
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    const secure = process.env.NODE_ENV !== "development";

    res.setHeader(
      "Set-Cookie",
      `userSession=${token}; Max-Age=86400; HttpOnly; Path=/; SameSite=None; ${
        secure ? "Secure" : ""
      }; Partitioned`
    );

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.log("error in adminLogin", e.message);
    return res.status(500).json({ msg: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    const secure = process.env.NODE_ENV !== "development";

    res.setHeader(
      "Set-Cookie",
      `userSession=${token}; Max-Age=0; HttpOnly; Path=/; SameSite=None; ${
        secure ? "Secure" : ""
      }; Partitioned`
    );

    return res.status(200).json({
      success: true,
      msg: "Logged out",
    });
  } catch (e) {
    console.log("error in logout");
    return res.status(500).json({ msg: e.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

export const getAdminUser = async (req, res) => {
  try {
    const user = await User.findById(req.adminuser.userId).select("-password");
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

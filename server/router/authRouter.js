import { Router } from "express";
import {
  adminLogin,
  getAdminUser,
  getUser,
  login,
  logout,
  register,
} from "../controller/authController.js";
import { userAuth } from "../middleware/user.js";
import { admin } from "../middleware/admin.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", adminLogin);
router.post("/logout", logout);
router.get("/getme", userAuth, getUser);
router.get("/getadmin", admin, getAdminUser);

export default router;

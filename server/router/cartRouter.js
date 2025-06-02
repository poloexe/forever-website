import { Router } from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controller/cartController.js";

const router = Router();

router.post("/add", addToCart);
router.post("/updatecart", updateCart);
router.get("/fetchcart", getUserCart);

export default router;

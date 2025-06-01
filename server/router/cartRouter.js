import { Router } from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controller/cartController";

const router = Router();

router.post("/add", addToCart);
router.post("/add", updateCart);
router.get("/fetchcart", getUserCart);

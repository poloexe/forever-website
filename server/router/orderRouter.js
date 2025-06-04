import { Router } from "express";
import {
  allOrders,
  placeOrderCash,
  placeOrderRazor,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controller/orderController.js";
import { admin } from "../middleware/admin.js";
import { userAuth } from "../middleware/user.js";

const router = Router();

// Admin features
router.get("/admin/lists", admin, allOrders);
router.post("/admin/status", admin, updateStatus);

// User features
router.get("/user/lists", userAuth, userOrders);

// Order Status
router.post("/place-order/stripe", userAuth, placeOrderStripe);
router.post("/place-order/razor", userAuth, placeOrderRazor);
router.post("/place-order/cash", userAuth, placeOrderCash);

export default router;

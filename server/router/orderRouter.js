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
import { user } from "../middleware/user.js";

const router = Router();

// Admin features
router.get("/admin/lists", admin, allOrders);
router.post("/admin/status", admin, updateStatus);

// User features
router.get("/user/lists", user, userOrders);

// Order Status
router.post("/place-order/stripe", placeOrderStripe);
router.post("/place-order/razor", placeOrderRazor);
router.post("/place-order/cash", placeOrderCash);

export default router;

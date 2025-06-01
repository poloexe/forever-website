import { Router } from "express";

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  removeItem,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import { admin } from "../middleware/admin.js";

const router = Router();

router.post(
  "/add",
  admin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.delete("/remove/:id", admin, removeItem);
router.get("/all", getAllProducts);
router.get("/single/:id", getSingleProduct);

export default router;

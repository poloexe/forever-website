import express from "express";
import "dotenv/config";

import cookieparser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import mongoDb from "./db/mongoDb.js";
import authRouter from "./router/authRouter.js";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";
import { userAuth } from "./middleware/user.js";

const PORT = process.env.PORT || 4000;
const app = express();

cloudinary.config({
  cloud_name: "ddhfkveam",
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:5000",
      "https://forever-website-chi.vercel.app",
      "https://forever-website-4grt.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", userAuth, cartRouter);
app.use("/api/order", orderRouter);

const startServer = async () => {
  try {
    await mongoDb();
    app.listen(PORT, () => {
      console.log(`Server live on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

startServer();

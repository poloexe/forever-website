import express from "express";
import "dotenv/config";

import cookieparser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import mongoDb from "./db/mongoDb.js";
import authRouter from "./router/authRouter.js";
import productRouter from "./router/productRouter.js";

const PORT = process.env.PORT || 4000;
const app = express();

cloudinary.config({
  cloud_name: "ddhfkveam",
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

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

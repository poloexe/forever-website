import { v2 as cloudinary } from "cloudinary";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  if (!name || !description || !price || !category || !subCategory || !sizes)
    return res.status(400).json({ msg: "Ouch! some fields still missing" });

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (image) => image !== undefined
  );

  let imageUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      return { url: result.secure_url, publicId: result.public_id };
    })
  );

  const productData = {
    name,
    description,
    price: Number(price),
    image: imageUrl,
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestSeller: bestSeller === "true" ? true : false,
  };

  const product = new Product(productData);
  await product.save();

  return res.status(200).json({ success: true, product });
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0)
      return res.status(200).json({ success: true, products });

    return res.status(200).json({ success: true, products });
  } catch (e) {
    console.log("error in getAllProduct");
    return res.status(500).json({ error: e.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: true, msg: "Nothing to delete here 😔" });

    if (product.image && Array.isArray(product.image)) {
      for (const img of product.image) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ success: true, msg: "Deleted successfully" });
  } catch (e) {
    console.log("error in removeItem");
    return res.status(500).json({ error: e.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: true, msg: "No products found 😔" });

    return res.status(200).json({ success: true, product });
  } catch (e) {
    console.log("error in removeItem");
    return res.status(500).json({ error: e.message });
  }
};

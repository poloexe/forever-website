import User from "../model/authModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, size } = req.body;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData }, { new: true });

    return res.status(200).json({ success: true, msg: "Added to Cart 🛒" });
  } catch (error) {
    console.log("Error in addToCart");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData }, { new: true });

    return res.status(200).json({ success: true, msg: "Cart Updated 🛒" });
  } catch (error) {
    console.log("Error in updateCart");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    let cartData = await userData.cartData;

    return res.status(200).json({ success: true, cartData: cartData });
  } catch (error) {
    console.log("Error in updateCart");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

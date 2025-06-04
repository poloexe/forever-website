import User from "../model/authModel.js";
import Order from "../model/orderModel.js";

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, msg: "Full information is required" });
    }

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    console.log("Error in placeOrderStripe");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const placeOrderRazor = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, msg: "Full information is required" });
    }

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razor",
      payment: false,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    console.log("Error in placeOrderRazor");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const placeOrderCash = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, msg: "Full information is required" });
    }

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash On Delivery",
      payment: false,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    console.log("Error in placeOrderCash");
    return res.status(400).json({ success: false, msg: error.message });
  }
};

// All orders for admin page
export const allOrders = async (req, res) => {};

// All orders for user client
export const userOrders = async (req, res) => {
  const { userId } = req.user;

  const orders = await Order.find({ userId });
  if (orders.length === 0) {
    return res.status(200).json({ success: true, msg: "No Orders available" });
  }

  return res.status(200).json({ success: true, orders });
};

// Update status
export const updateStatus = async (req, res) => {};

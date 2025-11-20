import asyncWrapper from "../utils/asyncWrapper.js";
import { Product } from "../models/products.models.js";
import { CartItem } from "../models/cart.models.js";

export const checkout = asyncWrapper(async (req, res) => {
  const { cartItems } = req.body;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "cartItems array required" });
  }

  let total = 0;
  const lineItems = [];

  for (const ci of cartItems) {
    if (!ci.productId || typeof ci.qty !== "number" || ci.qty < 1) {
      return res.status(400).json({
        success: false,
        message: "each item needs productId and numeric qty >=1",
      });
    }
    const p = await Product.findById(ci.productId).lean();
    if (!p)
      return res
        .status(404)
        .json({ success: false, message: `product ${ci.productId} not found` });
    const lineTotal = p.price * ci.qty;
    lineItems.push({
      productId: p._id,
      name: p.name,
      qty: ci.qty,
      price: p.price,
      lineTotal,
      image: p.image,
    });
    total += lineTotal;
  }

  const receipt = {
    id: `rcpt_${Date.now()}`,
    total,
    currency: "INR",
    items: lineItems,
    timestamp: new Date().toISOString(),
  };

  await CartItem.deleteMany({});

  return res.status(200).json({ success: true, data: receipt });
});

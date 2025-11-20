import asyncWrapper from "../utils/asyncWrapper.js";
import { Product } from "../models/products.models.js";
import { CartItem } from "../models/cart.models.js";

export const addToCart = asyncWrapper(async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || typeof qty !== "number") {
    return res.status(400).json({
      success: false,
      message: "productId required",
    });
  }

  const product = await Product.findById(productId).lean();
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "product not found" });

  // If same product exists in cart, increment qty
  let cartItem = await CartItem.findOne({ product: productId });
  if (cartItem) {
    cartItem.qty = cartItem.qty + qty;
    await cartItem.save();
    return res.status(200).json({ success: true, data: cartItem });
  }

  cartItem = await CartItem.create({ product: productId, qty });
  return res.status(201).json({ success: true, data: cartItem });
});

export const removeFromCart = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "id param required" });
  const deleted = await CartItem.findByIdAndDelete(id);
  if (!deleted)
    return res
      .status(404)
      .json({ success: false, message: "cart item not found" });
  return res
    .status(200)
    .json({ success: true, message: "removed", data: deleted });
});

export const getCart = asyncWrapper(async (req, res) => {
  const items = await CartItem.find().populate("product").lean();
  const total = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
  return res.status(200).json({ success: true, data: { items, total } });
});

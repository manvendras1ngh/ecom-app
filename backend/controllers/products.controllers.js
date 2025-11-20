import asyncWrapper from "../utils/asyncWrapper.js";
import { Product } from "../models/products.models.js";

export const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find().limit(50).lean();
  return res.status(200).json({ success: true, data: products });
});

export const createProduct = asyncWrapper(async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || typeof price !== "number" || !image) {
    return res.status(400).json({
      success: false,
      message: "name (string), price (number) and image (string) are required",
    });
  }
  const product = await Product.create({ name, price, image });
  return res.status(201).json({ success: true, data: product });
});

export const seedProducts = asyncWrapper(async (req, res) => {
  const { items } = req.body || {};
  const DEFAULT_ITEMS = [
    {
      name: "Classic Tee",
      price: 499,
      image: "https://placehold.co/600x400?text=Classic+Tee",
    },
    {
      name: "Denim Jacket",
      price: 1999,
      image: "https://placehold.co/600x400?text=Denim+Jacket",
    },
    {
      name: "Sneaker One",
      price: 3499,
      image: "https://placehold.co/600x400?text=Sneaker+One",
    },
    {
      name: "Casual Shirt",
      price: 799,
      image: "https://placehold.co/600x400?text=Casual+Shirt",
    },
    {
      name: "Slim Jeans",
      price: 1299,
      image: "https://placehold.co/600x400?text=Slim+Jeans",
    },
    {
      name: "Hoodie",
      price: 1499,
      image: "https://placehold.co/600x400?text=Hoodie",
    },
    { name: "Cap", price: 299, image: "https://placehold.co/600x400?text=Cap" },
    {
      name: "Socks (3 pack)",
      price: 199,
      image: "https://placehold.co/600x400?text=Socks",
    },
    {
      name: "Leather Belt",
      price: 599,
      image: "https://placehold.co/600x400?text=Leather+Belt",
    },
    {
      name: "Backpack",
      price: 2499,
      image: "https://placehold.co/600x400?text=Backpack",
    },
  ];

  const toInsert =
    Array.isArray(items) && items.length === 10 ? items : DEFAULT_ITEMS;

  // if ?force=true provided, clear existing products first
  if (req.query.force === "true") await Product.deleteMany({});

  const created = await Product.insertMany(toInsert);
  return res
    .status(201)
    .json({ success: true, count: created.length, data: created });
});

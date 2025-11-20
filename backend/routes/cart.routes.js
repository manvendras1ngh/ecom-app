import express from "express";
const router = express.Router();

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";

router.post("/", addToCart);

router.get("/", getCart);

router.delete("/:id", removeFromCart);

export default router;

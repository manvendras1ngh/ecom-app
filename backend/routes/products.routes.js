import express from "express";
const router = express.Router();
import {
  getProducts,
  createProduct,
  seedProducts,
} from "../controllers/products.controllers.js";

router.get("/", getProducts);

router.post("/", createProduct);

router.post("/seed", seedProducts);

export default router;

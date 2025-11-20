import express from "express";
const router = express.Router();
import { checkout } from "../controllers/checkout.controllers.js";

router.post("/", checkout);

export default router;

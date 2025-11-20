import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import instantiateConnection from "./db/db.connect.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";

//server config
const app = express();
configDotenv({ path: "./.env" });
const PORT = process.env.PORT || 3001;

app.use(express.json());

//db connection
try {
  instantiateConnection();
} catch (error) {
  throw error;
}

//server settings
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//routes
app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

export default app;

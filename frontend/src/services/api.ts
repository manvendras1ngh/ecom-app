import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5175/api",
  headers: { "Content-Type": "application/json" },
});

export const ProductsAPI = {
  list: () => api.get("/products"),
  create: (payload: any) => api.post("/products", payload),
};

export const CartAPI = {
  add: (payload: { productId: string; qty: number }) =>
    api.post("/cart", payload),
  list: () => api.get("/cart"),
  remove: (id: string) => api.delete(`/cart/${id}`),
};

export const CheckoutAPI = {
  checkout: (payload: { cartItems: { productId: string; qty: number }[] }) =>
    api.post("/checkout", payload),
};

export default api;

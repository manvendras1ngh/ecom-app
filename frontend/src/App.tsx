import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import ProductGrid from "./components/ProductGrid.tsx";
import CartPage from "./components/CartPage.tsx";
import CheckoutPage from "./components/CheckoutPage.tsx";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <Link to="/" className="font-semibold">
            Shop
          </Link>
          <div className="space-x-4">
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
          </div>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;

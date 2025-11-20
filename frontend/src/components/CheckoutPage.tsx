import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { CheckoutAPI } from "../services/api";
import toast from "react-hot-toast";

const CheckoutPage: React.FC = () => {
  const { items, total, reload } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return toast.error("name and email required");

    const payload = {
      cartItems: items.map((it) => ({
        productId: it.product._id,
        qty: it.qty,
      })),
    };
    try {
      setProcessing(true);
      const res = await CheckoutAPI.checkout(payload);
      setReceipt(res.data.data);
      toast.success("Checked out successfully");

      await reload();
    } catch (e) {
      console.error(e);
      toast.error("Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Checkout</h2>
      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full p-2 border rounded"
            required
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
            type="email"
          />
          <div className="flex justify-between items-center">
            <div className="font-semibold">Total: ₹{total}</div>
            <button
              disabled={processing || items.length === 0}
              className="py-2 px-4 border rounded"
            >
              {processing ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>

        {receipt && (
          <div className="mt-6 p-4 bg-white rounded">
            <h3 className="font-medium">Receipt</h3>
            <div>ID: {receipt.id}</div>
            <div>Time: {new Date(receipt.timestamp).toLocaleString()}</div>
            <div>Total: ₹{receipt.total}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

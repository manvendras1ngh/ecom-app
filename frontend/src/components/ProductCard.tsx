import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    try {
      setAdding(true);
      await addItem(product._id, 1);
      toast.success("Added to cart");
    } catch (e) {
      console.error(e);
      toast.error("Failed to add");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-3 flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600">₹{product.price}</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding}
        className="mt-4 py-2 rounded-md border text-sm"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;

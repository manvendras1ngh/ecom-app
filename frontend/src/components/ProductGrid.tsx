import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  const { products, loading } = useProducts();

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

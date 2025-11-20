import React from "react";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, total, addItem, removeItem, loading } = useCart();
  console.log(items);

  const handleRemove = async (id: string) => {
    try {
      await removeItem(id);
      toast.success("Removed");
    } catch (e) {
      toast.error("Remove failed");
    }
  };

  const handleQuantity = async (
    id: string,
    operation: "addOne" | "removeOne"
  ) => {
    try {
      if (operation === "addOne") {
        await addItem(id, 1);
      }

      if (operation === "removeOne") {
        const item = items.find((i) => i.product._id === id);

        if (item.qty === 1) {
          await removeItem(item._id);
          return;
        }

        await addItem(id, -1);
      }
    } catch (error) {
      console.error("Failed to modify quantity", error);
    }
  };
  return (
    <div>
      <h2 className="text-2xl mb-4">Your Cart</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {items.length === 0 ? (
            <div>
              Your cart is empty,{" "}
              <Link to="/" className="text-blue-800 underline">
                shop here
              </Link>
            </div>
          ) : (
            items.map((it) => (
              <div
                key={it._id}
                className="bg-white p-4 rounded flex items-center"
              >
                <img
                  src={it.product.image}
                  className="w-20 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <div className="font-medium">{it.product.name}</div>
                  <div className="text-sm text-gray-600">
                    Qty:{" "}
                    <span
                      onClick={() =>
                        handleQuantity(it.product._id, "removeOne")
                      }
                      className="cursor-pointer border p-1 m-2"
                    >
                      -
                    </span>{" "}
                    {it.qty}{" "}
                    <span
                      onClick={() => handleQuantity(it.product._id, "addOne")}
                      className="cursor-pointer border p-1 m-2"
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="mr-4">₹{it.product.price * it.qty}</div>
                <button
                  onClick={() => handleRemove(it._id)}
                  className="py-1 px-3 border rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {!!items.length && (
            <>
              <div className="p-4 bg-white rounded flex justify-between items-center">
                <div>Total</div>
                <div className="font-semibold">₹{total}</div>
              </div>
              <Link
                to="/checkout"
                className="py-1 border rounded cursor-pointer flex justify-center text-lg font-light"
              >
                checkout
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;

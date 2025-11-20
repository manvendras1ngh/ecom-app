import { useState, useEffect, useCallback } from "react";
import { CartAPI } from "../services/api";

export const useCart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const calculate = (itemsList: any[]) => {
    const t = itemsList.reduce((acc, it) => acc + it.product.price * it.qty, 0);
    setTotal(t);
  };

  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CartAPI.list();
      const data = res.data.data;
      setItems(data.items || []);
      calculate(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = async (productId: string, qty = 1) => {
    const res = await CartAPI.add({ productId, qty });
    await loadCart();
    return res.data;
  };

  const removeItem = async (id: string) => {
    const res = await CartAPI.remove(id);
    await loadCart();
    return res.data;
  };

  return { items, total, loading, reload: loadCart, addItem, removeItem };
};

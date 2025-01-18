import { useState, useEffect, useCallback } from "react";

// Define the CartItem interface
export interface CartItem {
  _id: string;
  imgUrl: string;
  productName: string;
  price: number;
  quantity: number;
  discount: number; // Discount in percentage
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart data from localStorage
  const fetchCart = useCallback(() => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Sync cart with localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Update quantity and dynamically calculate the total price
  const updateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId
            ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
            : item
        )
      );
    },
    []
  );

  // Handle item removal from cart
  const removeItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Calculate the total price of all items in the cart after discount
  const calculateTotalPrice = useCallback(() => {
    return cart.reduce(
      (sum, item) =>
        sum + (item.price * (1 - item.discount / 100)) * item.quantity,
      0
    );
  }, [cart]);

  return {
    cart,
    updateQuantity,
    removeItem,
    calculateTotalPrice,
  };
};

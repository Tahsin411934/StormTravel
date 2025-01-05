import React, { useState, useEffect } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CartProps {
  toggleModal: () => void;
}

interface CartItem {
  _id: string;
  imgUrl: string;
  productName: string;
  price: number;
  quantity: number;
  discount: number; // Discount in percentage
}

export const Cart: React.FC<CartProps> = ({ toggleModal }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Fetch cart data from localStorage
  const fetchCart = () => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Sync cart with localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Update quantity and dynamically calculate the total price
  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      )
    );
  };

  // Calculate the total price of all items in the cart after discount
  const calculateTotalPrice = () => {
    return cart.reduce(
      (sum, item) =>
        sum + (item.price * (1 - item.discount / 100)) * item.quantity,
      0
    );
  };

  const handleOrder = () => {
    toggleModal();
    navigate("/Accessories/order-summary", { state: { cart } });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={toggleModal} // Close modal when clicking on the background
    >
      <div
        className="bg-white max-w-4xl w-full max-h-[90%] overflow-y-auto rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={toggleModal}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            X
          </button>
        </div>

        {/* Cart Items */}
        <div>
          {cart.length === 0 ? (
            <div className="text-center text-gray-700">Your cart is empty.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border rounded-xl shadow-sm bg-white space-y-4 max-w-[200px] mx-auto"
                >
                  {/* Image with smaller size */}
                  <img
                    src={item.imgUrl}
                    alt={item.productName}
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <h3 className="text-xs font-medium text-gray-800">{item.productName}</h3>
                  <p className="flex items-center text-sm font-semibold text-gray-700">
                    Price: <FaBangladeshiTakaSign />
                    {(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">
                    (Discount: {item.discount}%)
                  </p>

                  <div className="flex items-center">
                    <label className="mr-2 text-gray-600">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value, 10))
                      }
                      className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Price */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800">Total Price: </h3>
            <h3 className="text-lg font-bold text-gray-800">
              {calculateTotalPrice().toFixed(2)} BDT
            </h3>
          </div>
        </div>

        {/* Confirm Order and Close Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleOrder}
            className="bg-blue-900 hover:bg-blue-700 text-white px-6 rounded-xl text-lg shadow-md transition duration-200"
          >
            Order Now
          </button>
          <button
            onClick={toggleModal}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl text-lg shadow-md transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeItem, updateQuantity, clearCart } from "../../redux/cartSlice"; // Import clearCart

interface CartProps {
  toggleModal: () => void;
}

export const Cart: React.FC<CartProps> = ({ toggleModal }) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price for all items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (1 - (item.discount || 0) / 100) * item.quantity,
      0
    );
  };

  // Handle order confirmation
  const handleOrder = () => {
    toggleModal();
    navigate("/Accessories/order-summary", { state: { cart } });
  };

  // Handle quantity change
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return; // Ensure quantity is at least 1
    dispatch(updateQuantity({ id, quantity }));
  };

  // Handle clear cart
  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch clearCart action
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={toggleModal}
    >
      <div
        className="bg-white max-w-4xl w-full max-h-[90%] overflow-y-auto rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h2>
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
              {cart.map((item) => {
                const discountedPrice = item.price * (1 - (item.discount || 0) / 100); // Price after discount
                const totalPriceForItem = discountedPrice * item.quantity; // Total price for the item (including quantity)

                return (
                  <div
                    key={item._id}
                    className="relative p-4 border rounded-xl shadow-sm bg-white space-y-4 max-w-[200px] mx-auto"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => dispatch(removeItem(item._id))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <span className="text-lg font-semibold">X</span>
                    </button>

                    {/* Image */}
                    <img
                      src={item.imgUrl}
                      alt={item.productName}
                      className="h-24 w-full object-cover rounded-md"
                    />

                    {/* Product Name */}
                    <h3 className="text-xs font-medium text-gray-800">{item.productName}</h3>

                    {/* Original Price */}
                    <p className="text-xs text-gray-600">
                      Original Price: {item.price.toFixed(2)} BDT
                    </p>

                    {/* Discounted Price */}
                    <p className="text-xs text-gray-600">
                      Discounted Price: {discountedPrice.toFixed(2)} BDT
                    </p>

                    {/* Total Price for Item (including quantity) */}
                    <p className="text-xs text-gray-600">
                      Total: {totalPriceForItem.toFixed(2)} BDT
                    </p>

                    {/* Quantity Input */}
                    <div className="flex items-center">
                      <label className="mr-2 text-gray-600">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, parseInt(e.target.value, 10))
                        }
                        className="w-20 text-center border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grand Total Price */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800">Grand Total: </h3>
            <h3 className="text-lg font-bold text-gray-800">
              {calculateTotalPrice().toFixed(2)} BDT
            </h3>
          </div>
        </div>

        {/* Confirm Order, Clear Cart, and Close Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleOrder}
            className="bg-blue-900 hover:bg-blue-700 text-white px-6 rounded-xl text-lg shadow-md transition duration-200"
          >
            Order Now
          </button>
          <button
            onClick={handleClearCart}
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl text-lg shadow-md transition duration-200"
          >
            Clear Cart
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
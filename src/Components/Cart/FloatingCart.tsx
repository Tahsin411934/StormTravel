import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import { useSelector } from 'react-redux'; // Import useSelector to access cart state
import { RootState } from '../../redux/store'; // Import RootState for type safety
import { Cart } from '../Cart/Cart'; // Import Cart component

export const FloatingCart: React.FC = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false); // State to manage cart modal
  const cart = useSelector((state: RootState) => state.cart.cart); // Get cart state from Redux

  // Toggle cart modal
  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <div
        className="fixed bottom-10 right-10 z-50"
        onClick={toggleCartModal}
      >
        <button className="bg-[#024B90] text-white p-4 rounded-full shadow-lg hover:bg-[#03356b] transition duration-200 flex items-center">
          <FaShoppingCart className="text-2xl" /> {/* Cart Icon */}
          {/* Cart Item Count Badge */}
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {isCartModalOpen && <Cart toggleModal={toggleCartModal} />}
    </>
  );
};
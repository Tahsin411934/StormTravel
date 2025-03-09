import React from 'react';
import { useFetchData } from '../../Hook/useFeatchData';
import { FaBangladeshiTakaSign, FaCartPlus, FaEye } from 'react-icons/fa6'; // Import FaCartPlus and FaEye for icons
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { addToCart } from '../../redux/cartSlice'; // Import addToCart action

interface AccessoryItem {
  _id: string;
  productName: string;
  imgUrl: string;
  available: string;
  category: string;
  price: number;
  finalPrice: number;
  discount: number;
  description: string; // Add description to match CartItem type
  // Define other properties of `item` as needed.
}

export const Accessories: React.FC = () => {
  const { data } = useFetchData() as { data: AccessoryItem[] | undefined };
  const dispatch = useDispatch(); // Initialize dispatch

  // Handle adding item to cart
  const handleAddToCart = (item: AccessoryItem) => {
    const cartItem = {
      ...item,
      quantity: 1, // Default quantity is 1
    };
    dispatch(addToCart(cartItem)); // Dispatch addToCart action
  };

  return (
    <div className='font-Poppins w-[90%] mx-auto pt-20'>
      <div className='font-Poppins font-bold text-2xl mb-8'>
        <h1>Travel Accessories</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data?.slice(0, 6).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Section */}
            <figure className="relative">
              <img
                src={item.imgUrl}
                alt={item.productName}
                className="w-full h-48 object-cover" // Reduced image size
              />
              {/* Discount Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-[#024B90] text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {item.discount}% OFF
                </span>
              </div>
            </figure>

            {/* Product Details */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {item.productName}
                <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {item.available}
                </span>
              </h2>

              {/* Price Section */}
              <div className="flex items-center space-x-4 mb-4">
                <del className="text-slate-500 flex items-center">
                  <FaBangladeshiTakaSign className="mr-1" />
                  {item.price}
                </del>
                <span className="text-[#024B90] font-semibold flex items-center">
                  <FaBangladeshiTakaSign className="mr-1" />
                  {item.finalPrice}
                </span>
              </div>

              {/* Category Badges */}
              <div className="flex space-x-2 mb-4">
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Fashion
                </span>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Products
                </span>
              </div>

              {/* Add to Cart and See Details Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAddToCart(item)} // Add item to cart on click
                  className="flex-1 bg-[#024B90] text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-[#03356b] transition duration-200"
                >
                  <FaCartPlus className="text-lg" /> {/* Shopping cart icon */}
                  <span>Add to Cart</span>
                </button>
                <Link
                  to={`/Accessories/${item._id}/${item.category}`} // Link to details page
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-700 transition duration-200"
                >
                  <FaEye className="text-lg" /> {/* Eye icon */}
                  <span>See Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
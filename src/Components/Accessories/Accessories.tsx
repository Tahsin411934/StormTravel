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
      <div className='font-Poppins font-bold text-3xl'>
        <h1>Travel Accessories</h1>
      </div>
      <div className='lg:grid grid-cols-3 gap-5 relative'>
        {data?.slice(0, 6).map((item, index) => (
          <div key={index}>
            <div className="hover:bg-green-100 card bg-base-100 shadow-xl">
              <figure>
                <img src={item.imgUrl} alt={item.productName} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.productName}
                  <div className="badge badge-secondary">{item.available}</div>
                </h2>
                <div className="card-actions">
                  <del className='flex items-center text-slate-500'>
                    <FaBangladeshiTakaSign />{item.price}
                  </del>
                  <span className='text-[#024B90] font-semibold flex items-center'>
                    <FaBangladeshiTakaSign /> {item.finalPrice}
                  </span>
                </div>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
                <div className='absolute top-10'>
                  <button className="bg-[#024B90] text-white rounded-full p-3">
                    {item.discount}% OFF
                  </button>
                </div>

                {/* Add to Cart and See Details Buttons */}
                <div className="flex justify-between mt-4 space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)} // Add item to cart on click
                    className="bg-[#024B90] text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-[#03356b] transition duration-200 flex-1"
                  >
                    <FaCartPlus className="text-lg" /> {/* Shopping cart icon */}
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    to={`/Accessories/${item._id}/${item.category}`} // Link to details page
                    className="bg-gray-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-700 transition duration-200 flex-1"
                  >
                    <FaEye className="text-lg" /> {/* Eye icon */}
                    <span>See Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
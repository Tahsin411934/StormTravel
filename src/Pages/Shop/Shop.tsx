import React, { useState } from 'react';
import { useFetchData } from '../../Hook/useFeatchData';
import { FaBangladeshiTakaSign, FaCartPlus, FaEye } from 'react-icons/fa6'; // Import icons
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { addToCart } from '../../redux/cartSlice'; // Import addToCart action
import { RootState } from '../../redux/store'; // Import RootState for type safety

import {
    FaUmbrellaBeach,
    FaSuitcaseRolling,
    FaBoxOpen,
    FaCouch,
    FaPlug,
    FaLuggageCart,
} from 'react-icons/fa';
import { FloatingCart } from '../../Components/Cart/FloatingCart';
const categories = [
    { id: 1, name: 'Pack', icon: <FaBoxOpen /> },
    { id: 2, name: 'Packing Organizers', icon: <FaBoxOpen /> },
    { id: 3, name: 'Travel Pillows', icon: <FaCouch /> },
    { id: 4, name: 'Travel Bags', icon: <FaSuitcaseRolling /> },
    { id: 5, name: 'cable', icon: <FaPlug /> },
    { id: 6, name: 'Luggage', icon: <FaLuggageCart /> },
];

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
}

export const Shop: React.FC = () => {
    const { data } = useFetchData() as { data: AccessoryItem[] | undefined };
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch(); // Initialize dispatch

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 5 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= categories.length - 5 ? 0 : prevIndex + 1));
    };

    // Show only 5 categories at a time
    const visibleCategories = categories.slice(currentIndex, currentIndex + 5);

    // Handle adding item to cart
    const handleAddToCart = (item: AccessoryItem) => {
        const cartItem = {
            ...item,
            quantity: 1, // Default quantity is 1
        };
        dispatch(addToCart(cartItem)); // Dispatch addToCart action
    };

    return (
        <div className="font-Poppins w-[90%] mx-auto pt-20">
            {/* Category Slider */}
            <div className="font-Poppins font-bold text-3xl mb-8">
                <h1>Find Your Product By Category:</h1>
            </div>
            <div className="relative">
                <div className="flex items-center w-[85%] mx-auto space-x-4">
                    {visibleCategories.map((category) => (
                        <Link to={`/Accessories/${category.name}`} key={category.id}>
                            <div className="flex h-36 flex-col items-center justify-center space-y-2 p-8 bg-green-100 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer w-[200px]">
                                <div className="text-4xl text-[#024B90]">{category.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#024B90] text-white p-3 rounded-full"
                >
                    &#8249;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#024B90] text-white p-3 rounded-full"
                >
                    &#8250;
                </button>
            </div>

            {/* Travel Accessories Section */}
            <div className="font-Poppins font-bold text-3xl mb-8 mt-12">
                <h1>Travel Accessories</h1>
            </div>
            <div className="lg:grid grid-cols-3 gap-5 relative">
                {data?.map((item, index) => (
                    <div key={index}>
                        <div className="hover:bg-green-100 card bg-base-100 shadow-xl relative">
                            <figure className="h-64 overflow-hidden">
                                <img
                                    src={item.imgUrl}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {item.productName}
                                    <div className="badge badge-secondary">{item.available}</div>
                                </h2>
                                <div className="card-actions">
                                    <del className="flex items-center text-slate-500">
                                        <FaBangladeshiTakaSign />
                                        {item.price}
                                    </del>
                                    <span className="text-[#024B90] font-semibold flex items-center">
                                        <FaBangladeshiTakaSign />
                                        {item.finalPrice}
                                    </span>
                                </div>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Fashion</div>
                                    <div className="badge badge-outline">Products</div>
                                </div>
                                <div className="absolute top-10 left-2">
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

            {/* Floating Cart Button */}
            <FloatingCart />
        </div>
    );
};
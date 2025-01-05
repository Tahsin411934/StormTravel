import React, { useState } from 'react';
import { useFetchData } from '../../Hook/useFeatchData';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import {
    FaUmbrellaBeach,
    FaSuitcaseRolling,
    FaBoxOpen,
    FaCouch,
    FaPlug,
    FaLuggageCart,
} from 'react-icons/fa';

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
}



export const Shop: React.FC = () => {
    const { data } = useFetchData() as { data: AccessoryItem[] | undefined };
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 5 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= categories.length - 5 ? 0 : prevIndex + 1));
    };

    // Show only 5 categories at a time
    const visibleCategories = categories.slice(currentIndex, currentIndex + 5);

    return (
        <div className="font-Poppins w-[90%] mx-auto pt-20">
            {/* Category Slider */}
            <div className="font-Poppins font-bold text-3xl mb-8">
                <h1>Find Your Product By Category:</h1>
            </div>
            <div className="relative">
                <div className="flex items-center w-[85%] mx-auto space-x-4">
                    {visibleCategories.map((category) => (
                        <Link to={`/Accessories/${category.name}`}>
                        <div
                            key={category.id}
                            className="flex h-36 flex-col items-center justify-center space-y-2 p-8 bg-green-100 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer w-[200px]"
                        >
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
            <div className="grid grid-cols-3 gap-5 relative">
                {data?.map((item, index) => (
                    <div key={index}>
                        <Link to={`/Accessories/${item._id}/${item.category}`}>
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
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

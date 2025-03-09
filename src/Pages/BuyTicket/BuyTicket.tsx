import React, { useState } from "react";
import { MdFlight, MdLocalTaxi, MdTrain } from "react-icons/md"; // Import icons from react-icons
import {
  FaSearch,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa"; // Additional icons
import SearchbarForFlight from "../../Components/Banner/SearchbarForFlight";
import SearchBarForTrain from "../../Components/Banner/SearchbarForTrain";
import SearchBarForBus from "../../Components/Banner/SearchbarForBus";
import MostPopularAirlines from "../../Components/MostPopularAirlines/MostPopularAirlines";
import MostPopularBusOperators from "../../Components/MostPopularBusOperators/MostPopularBusOperators";
import MostPopularTrains from "../../Components/MostPopularTrains/MostPopularTrains";

const BuyTicket = () => {
  const [activeTab, setActiveTab] = useState("flight"); // State to track the active tab

  return (
    <div className="font-Montserrat bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Banner Image */}
        <img
          src="banner-image.webp" // Replace with your image URL
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-950/80 to-blue-950/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-400">StormTravel!</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl font-semibold mb-6 max-w-2xl">
            Your one-stop destination for booking flights, buses, and trains.
            Explore the world with ease and comfort.
          </p>

          {/* Call-to-Action Button */}
          <button className="flex items-center bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-all duration-300">
            <FaSearch className="mr-2" /> Start Your Journey
            <FaArrowRight className="ml-2" />
          </button>

          {/* Decorative Icons */}
          <div className="absolute bottom-8 left-8 flex space-x-4 opacity-50">
            <MdFlight className="text-4xl" />
            <MdLocalTaxi className="text-4xl" />
            <MdTrain className="text-4xl" />
          </div>
          <div className="absolute bottom-8 right-8 flex space-x-4 opacity-50">
            <MdFlight className="text-4xl" />
            <MdLocalTaxi className="text-4xl" />
            <MdTrain className="text-4xl" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 mt-8 ">
        {/* Sidebar Navigation */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Book Your Ticket
            </h2>
            <ul className="space-y-3">
              <li
                onClick={() => setActiveTab("flight")}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTab === "flight"
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <MdFlight className="mr-2" /> Flight
              </li>
              <li
                onClick={() => setActiveTab("bus")}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTab === "bus"
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <MdLocalTaxi className="mr-2" /> Bus
              </li>
              <li
                onClick={() => setActiveTab("train")}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTab === "train"
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <MdTrain className="mr-2" /> Train
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-3/4">
            {activeTab === "flight" && <SearchbarForFlight />}
            {activeTab === "bus" && <SearchBarForBus />}
            {activeTab === "train" && <SearchBarForTrain />}
          </div>
        </div>
 {/* Why Choose Us? Section */}
 <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <MdFlight className="text-4xl text-blue-950 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Wide Range of Options
                </h3>
                <p className="text-gray-600">
                  Choose from a variety of flights, buses, and trains to suit
                  your travel needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaStar className="text-4xl text-blue-950 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Best Prices Guaranteed
                </h3>
                <p className="text-gray-600">
                  We offer the best prices and exclusive deals for our
                  customers.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaSearch className="text-4xl text-blue-950 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Easy Booking Process
                </h3>
                <p className="text-gray-600">
                  Our platform makes booking quick, easy, and hassle-free.
                </p>
              </div>
            </div>
          </div>
        {/* Main Content Area */}
        <div className="w-full ">
          {/* Search Section */}

          {/* Most Popular Sections */}
          <div className="mt-8 space-y-8">
            <MostPopularAirlines />
            <MostPopularBusOperators />
            <MostPopularTrains />
          </div>

         

          {/* Testimonials Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaQuoteLeft className="text-blue-950 mb-4" />
                <p className="text-gray-600 italic">
                  "StormTravel made my trip planning so easy! I found the best
                  deals on flights and buses."
                </p>
                <div className="flex items-center mt-4">
                  <img
                    src="user1.jpg" // Replace with user image URL
                    alt="User"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Frequent Traveler</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaQuoteLeft className="text-blue-950 mb-4" />
                <p className="text-gray-600 italic">
                  "I love the convenience of booking trains and buses in one
                  place. Highly recommended!"
                </p>
                <div className="flex items-center mt-4">
                  <img
                    src="user2.jpg" // Replace with user image URL
                    alt="User"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-gray-500">Adventure Seeker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Tips Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              Travel Tips
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MdFlight className="text-2xl text-blue-950 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Book Early</h3>
                  <p className="text-gray-600">
                    Booking your tickets early can save you money and ensure
                    availability.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MdLocalTaxi className="text-2xl text-blue-950 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Check Reviews</h3>
                  <p className="text-gray-600">
                    Read reviews from other travelers to choose the best
                    options.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MdTrain className="text-2xl text-blue-950 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Pack Light</h3>
                  <p className="text-gray-600">
                    Traveling light makes your journey more comfortable and
                    stress-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;

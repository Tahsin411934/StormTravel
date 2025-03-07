import React, { useState } from "react";
import { MdFlight, MdLocalTaxi, MdTrain } from "react-icons/md"; // Import icons from react-icons
import SearchbarForFlight from "../../Components/Banner/SearchbarForFlight";

import SearchBarForTrain from "../../Components/Banner/SearchbarForTrain";
import SearchBarForBus from "../../Components/Banner/SearchbarForBus";


const BuyTicket = () => {
  const [activeTab, setActiveTab] = useState("flight"); // State to track the active tab

  return (
    <div>
      <div className="relative -z-10 w-full h-96 overflow-hidden bg-black font-Montserrat">
        {/* Use an image instead of a video */}
        <img
          src="banner-image.webp" // Replace with your image URL
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay to darken the image */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full lg:w-[60%] text-white px-4">
          <h1 className="md:text-4xl text-2xl">
            Welcome to <span className="font-bold">StormTravel!</span>
          </h1>
          <p className="mt-2 text-base lg:mr-8 font-semibold md:text-xl">
            Find Flights, Bus, Hotels, Visa & Holidays
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:w-[83%]">
        <div className="bg-white rounded-lg shadow-2xl -mt-20 md:-mt-32 p-4">
          {/* Tabs Navigation */}
          <div className="flex items-center justify-center">
            <div className="flex overflow-x-auto scrollbar-hide">
              <div
                onClick={() => setActiveTab("flight")}
                className={`flex items-center flex-shrink-0 px-4 py-2 border-b-4 ${
                  activeTab === "flight"
                    ? "border-violet-600"
                    : "border-gray-300"
                } text-gray-600 cursor-pointer`}
              >
                <MdFlight className="text-yellow-700 mr-2" /> Flight
              </div>
              <div
                onClick={() => setActiveTab("bus")}
                className={`flex items-center flex-shrink-0 px-4 py-2 border-b-4 ${
                  activeTab === "bus" ? "border-violet-600" : "border-gray-300"
                } text-gray-600 cursor-pointer`}
              >
                <MdLocalTaxi className="text-yellow-700 mr-2" /> Bus
              </div>
              <div
                onClick={() => setActiveTab("train")}
                className={`flex items-center flex-shrink-0 px-4 py-2 border-b-4 ${
                  activeTab === "train" ? "border-violet-600" : "border-gray-300"
                } text-gray-600 cursor-pointer`}
              >
                <MdTrain className="text-yellow-700 mr-2" /> Train
              </div>
            </div>
          </div>
          <hr className="my-2 border-gray-200" />

          {/* Render the Active Search Bar */}
          <div className="mt-4">
            {activeTab === "flight" && <SearchbarForFlight />}
            {activeTab === "bus" && <SearchBarForBus />}
            {activeTab === "train" && <SearchBarForTrain />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;

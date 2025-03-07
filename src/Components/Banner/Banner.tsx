import React, { useState } from "react";
import { MdFlight, MdLocalTaxi, MdTrain } from "react-icons/md"; // Import icons from react-icons
import SearchbarForFlight from "./SearchbarForFlight";
import SearchbarForBus from "./SearchbarForBus";
import SearchBarForTrain from "./SearchbarForTrain";

const Banner = () => {
  const [activeTab, setActiveTab] = useState("flight"); // State to track the active tab

  return (
    <div>
      {/* Video Banner Section */}
      <div className="relative font-Murecho -z-10 w-full h-56 sm:h-64 md:h-80 overflow-hidden bg-black ">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay to darken the video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Text Overlay */}
        <div className="relative z-10 flex flex-col items-center -mt-8 lg:items-start lg:w-[80%] lg:mx-auto justify-center h-full text-white px-4">
          <h1 className="sm:text-3xl  ">
            Welcome to <span className="text-2xl font-bold md:text-4xl ">StormTravel!</span>
          </h1>
          <p className="mt-2 text-sm sm:text-lg md:text-lg font-semibold">
            Find Flights, Bus, Hotels, Visa & Holidays
          </p>
        </div>
      </div>

      {/* Search Tabs Section */}
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
            {activeTab === "bus" && <SearchbarForBus />}
            {activeTab === "train" && <SearchBarForTrain />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
import React, { useState } from "react";
import { MdFlight, MdLocalTaxi, MdTrain } from "react-icons/md"; // Import icons from react-icons
import SearchbarForFlight from "./SearchbarForFlight";
import SearchbarForBus from "./SearchbarForBus";
import SearchBarForTrain from "./SearchbarForTrain";

const Banner = () => {
  const [activeTab, setActiveTab] = useState("flight"); // State to track the active tab

  return (
    <div>
      <div className="relative -z-10 w-full h-96 overflow-hidden bg-black font-Montserrat ">
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

      <div className="bg-[#ffffff] z-10 rounded-lg shadow-2xl w-[70%] mx-auto p-4 -mt-32">
        <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
          <div
           
            onClick={() => setActiveTab("flight")} // Set active tab to flight
            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
              activeTab === "flight" ? "border-violet-600" : "dark:border-gray-300"
            } dark:text-gray-600`}
          >
            <MdFlight className="text-yellow-700 mr-2" /> Flight
          </div>
          <div
           
            onClick={() => setActiveTab("bus")} // Set active tab to bus
            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
              activeTab === "bus" ? "border-violet-600" : "dark:border-gray-300"
            } dark:text-gray-600`}
          >
            <MdLocalTaxi className="text-yellow-700 mr-2" /> Bus
          </div>
          <div
            
            onClick={() => setActiveTab("train")} // Set active tab to train
            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
              activeTab === "train" ? "border-violet-600" : "dark:border-gray-300"
            } dark:text-gray-900`}
          >
            <MdTrain className="text-yellow-700 mr-2" /> Train
          </div>
         
        </div>
        <hr className='-ml-0 h-[1px] border-none bg-slate-200 mx-auto w-[100%]' />
        {/* Render the active search bar based on the selected tab */}
        {activeTab === "flight" && <SearchbarForFlight />}
        {activeTab === "bus" && <SearchbarForBus />}
        {activeTab === "train" && <div><SearchBarForTrain/></div>}
      </div>
    </div>
  );
};

export default Banner;

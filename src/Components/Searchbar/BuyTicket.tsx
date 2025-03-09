import React, { useState, useEffect } from "react";
import { MdFlight, MdLocalTaxi, MdTrain } from "react-icons/md";
import { useLocation } from "react-router-dom";
import SearchbarForFlight from "../Banner/SearchbarForFlight";
import SearchBarForTrain from "../Banner/SearchbarForTrain";
import InsideBusSearch from "../../Pages/SearchResult/InsideBusSearch";
import InsideFlightSearchBar from "../../Pages/SearchResult/InsideFlightSearchBar";
import InsideTrainSearchBar from "../../Pages/SearchResult/InsideTrainSearchBar";

const BuyTicket = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("bus");
  const [visibleTab, setVisibleTab] = useState("all");

  // Determine which tab should be visible based on the current route
  useEffect(() => {
    if (location.pathname === "/flightSearchResult") {
      setVisibleTab("flight");
      setActiveTab("flight");
    } else if (location.pathname === "/trainSearchResult") {
      setVisibleTab("train");
      setActiveTab("train");
    } else if (location.pathname === "/busSearchResult") {
      setVisibleTab("bus");
      setActiveTab("bus");
    } else {
      setVisibleTab("all"); // Show all tabs for default routes
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="bg-[#ffffff] z-10 rounded-lg shadow-2xl w-[99%] mx-auto p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-3xl">
        {/* Tabs */}
        {visibleTab === "all" && (
          <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
            <div
              onClick={() => setActiveTab("flight")}
              className={`flex items-center flex-shrink-0 px-5 py-3 border-b-4 cursor-pointer transition-all duration-300 ${
                activeTab === "flight"
                  ? "border-violet-600 text-violet-600"
                  : "border-gray-300 text-gray-600 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              <MdFlight className="text-yellow-700 mr-2 text-xl" /> Flight
            </div>
            <div
              onClick={() => setActiveTab("bus")}
              className={`flex items-center flex-shrink-0 px-5 py-3 border-b-4 cursor-pointer transition-all duration-300 ${
                activeTab === "bus"
                  ? "border-violet-600 text-violet-600"
                  : "border-gray-300 text-gray-600 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              <MdLocalTaxi className="text-yellow-700 mr-2 text-xl" /> Bus
            </div>
            <div
              onClick={() => setActiveTab("train")}
              className={`flex items-center flex-shrink-0 px-5 py-3 border-b-4 cursor-pointer transition-all duration-300 ${
                activeTab === "train"
                  ? "border-violet-600 text-violet-600"
                  : "border-gray-300 text-gray-600 hover:border-violet-400 hover:text-violet-400"
              }`}
            >
              <MdTrain className="text-yellow-700 mr-2 text-xl" /> Train
            </div>
          </div>
        )}

        {/* Render the search bar based on activeTab or visibleTab */}
        <div className="mt-6 transition-all duration-500 ease-in-out">
          {(visibleTab === "all" && activeTab === "bus") || visibleTab === "bus" ? (
            <InsideBusSearch />
          ) : (visibleTab === "all" && activeTab === "flight") || visibleTab === "flight" ? (
            <InsideFlightSearchBar />
          ) : (visibleTab === "all" && activeTab === "train") || visibleTab === "train" ? (
            <InsideTrainSearchBar />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
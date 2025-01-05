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
    <div>
      <div className="bg-[#ffffff] z-10 rounded-lg shadow-2xl w-[99%] mx-auto p-4 border border-gray-200">
        {/* Tabs */}
        {visibleTab === "all" && (
          <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
            <div
              onClick={() => setActiveTab("flight")}
              className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
                activeTab === "flight" ? "border-violet-600" : "dark:border-gray-300"
              } dark:text-gray-600`}
            >
              <MdFlight className="text-yellow-700 mr-2" /> Flight
            </div>
            <div
              onClick={() => setActiveTab("bus")}
              className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
                activeTab === "bus" ? "border-violet-600" : "dark:border-gray-300"
              } dark:text-gray-600`}
            >
              <MdLocalTaxi className="text-yellow-700 mr-2" /> Bus
            </div>
            <div
              onClick={() => setActiveTab("train")}
              className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${
                activeTab === "train" ? "border-violet-600" : "dark:border-gray-300"
              } dark:text-gray-900`}
            >
              <MdTrain className="text-yellow-700 mr-2" /> Train
            </div>
          </div>
        )}

        {/* Render the search bar based on activeTab or visibleTab */}
        {(visibleTab === "all" && activeTab === "bus") || visibleTab === "bus" ? (
          <InsideBusSearch />
        ) : (visibleTab === "all" && activeTab === "flight") || visibleTab === "flight" ? (
          <InsideFlightSearchBar />
        ) : (visibleTab === "all" && activeTab === "train") || visibleTab === "train" ? (
          <InsideTrainSearchBar />
        ) : null}
      </div>
    </div>
  );
};

export default BuyTicket;

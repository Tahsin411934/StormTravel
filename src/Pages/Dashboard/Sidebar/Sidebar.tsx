import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Sidebar/Sidebar.css";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaPlusCircle } from "react-icons/fa"; // Added FaPlusCircle

const Sidebar: React.FC = () => {
  const [isAddingOpen, setIsAddingOpen] = useState(false); // State to toggle 'Adding From' section
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for 'Settings' dropdown

  return (
    <div className="sidebar-container shadow-xl bg-gradient-to-b from-[#2b3a42] to-[#1a2630] h-screen">
      <div className="h-full p-4 w-full dark:bg-gray-900 dark:text-gray-100">
        {/* Logo Section */}
        <div className=" flex items-center font-GreatVibes justify-center italic text-[#1b82ff] text-xl font-bold">
          <img src="logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-3xl mt-2 font-semibold transform: skew(-10deg)">StormTravel</span>
        </div>

        <hr className="h-[1px] border-none bg-slate-600 mb-4" />

        <div className="divide-y divide-gray-700 w-[99%]">
          <ul className="pt-2 pb-4 space-y-3 text-sm">
            {/* Dashboard Link */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center p-3  rounded-lg transition-all ease-in-out duration-200 
                  ${isActive ? "bg-[#1C9FE1] text-white" : "text-gray-300 hover:bg-[#2b3a42] hover:text-white"}`}
              >
                <MdDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Adding From Dropdown */}
            <li>
              <div
                className="flex items-center  space-x-3 cursor-pointer text-gray-300 hover:text-white hover:bg-[#2b3a42] rounded-lg transition-all duration-200"
                onClick={() => setIsAddingOpen(!isAddingOpen)} // Toggle the 'Adding From' section
              >
                <FaPlusCircle className="w-5 h-5" /> {/* Adding the icon here */}
                <span className="font-semibold text-base">Ticket Management</span>
                <FaAngleDown className={`ml-auto ${isAddingOpen ? 'rotate-180' : ''}`} />
              </div>
              {isAddingOpen && (
                <ul className="pl-6 space-y-2 mt-2 text-gray-300">
                  <li>
                    <NavLink
                      to="/dashboard/AddBusSchedule"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Bus Schedule</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/AddFlightSchedule"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Flight Schedule</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/AddTrainSchedule"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Train Schedule</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/AddPackage"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Package</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/AddTourGuider"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span> Tour Guider</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/AddAccessries"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-plus"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Accessries</span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings Dropdown */}
            <li>
              <div
                className="flex items-center  space-x-3 cursor-pointer text-gray-300 hover:text-white hover:bg-[#2b3a42] rounded-lg transition-all duration-200"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)} // Toggle 'Settings' dropdown
              >
                <MdSettings className="w-5 h-5" />
                <span className="font-semibold text-lg">Settings</span>
                <FaAngleDown className={`ml-auto ${isSettingsOpen ? 'rotate-180' : ''}`} />
              </div>
              {isSettingsOpen && (
                <ul className="pl-6 space-y-2 mt-2 text-gray-300">
                  <li>
                    <NavLink
                      to="/settings/profile"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <span>Profile Settings</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings/privacy"
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md transition-all ease-in-out duration-200 
                        ${isActive ? "bg-[#1C9FE1] text-white" : "hover:bg-[#1C9FE1] hover:text-white"}`}
                    >
                      <span>Privacy Settings</span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Other Links */}
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center p-3 space-x-3 rounded-lg transition-all ease-in-out duration-200 
                  ${isActive ? "bg-[#1C9FE1] text-white" : "text-gray-300 hover:bg-[#2b3a42] hover:text-white"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                </svg>
                <span>Chat</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `flex items-center p-3 space-x-3 rounded-lg transition-all ease-in-out duration-200 
                  ${isActive ? "bg-[#1C9FE1] text-white" : "text-gray-300 hover:bg-[#2b3a42] hover:text-white"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                </svg>
                <span>Orders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

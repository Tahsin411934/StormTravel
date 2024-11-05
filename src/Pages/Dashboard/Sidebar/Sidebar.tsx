import React from "react";
import { NavLink } from "react-router-dom";
import "../Sidebar/Sidebar.css";
import { MdDashboard } from "react-icons/md";

const Sidebar: React.FC = () => {
  return (
    <div className="shadow-2xl">
      <div className="h-screen p-3  w-60 dark:bg-gray-50 dark:text-gray-800">
      <div className="mx-auto flex items-center font-GreatVibes justify-center italic text-[#1b82ff] text-xl font-bold">
            {/* <img src="logo.png" alt="Logo" className="h-10 w-10" /> */}
            <span className="text-3xl mr-4 mt-2 font-semibold transform: skew(-10deg)">StormTravel</span>
          </div>
          <hr className='-ml-0 h-[1px] border-none bg-slate-400 mb-3 mx-auto w-[100%]' />
        <div className="divide-y dark:divide-gray-300">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li>
            <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
              >
                <MdDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </NavLink>

            </li>
            <div className="">
              <p className="text-sm font-semibold text-blue-800" >Adding From</p>
            </div>
            
            <li>
              <NavLink
                to="/dashboard/AddBusSchedule"
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
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

                <span>Add Bus Schedule</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/AddPackage"
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
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

                <span>Add New Package</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/AddAccessries"
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
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
  className="feather feather-plus-circle"
>
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="8" x2="12" y2="16"></line>
  <line x1="8" y1="12" x2="16" y2="12"></line>
</svg>

                <span>Add New Accessories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
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
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
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
            <li>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `flex items-center p-1 space-x-3 rounded-md dark:text-gray-900 ${
                    isActive ? "bg-[#1C9FE1] text-white" : ""
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,20.7,20.7-20.7L460.1,266.94A128,128,0,0,0,453.122,79.012ZM437.78,251.68,256.485,432.989,74.868,251.574a96.1,96.1,0,0,1,0-135.841l6.91-6.911a96.1,96.1,0,0,1,135.852,0l24.043,24.042,24.031-24.029a96.1,96.1,0,0,1,135.851,0l6.91,6.911A96.1,96.1,0,0,1,437.78,251.68Z"></path>
                </svg>
                <span>Wishlist</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdAppBlocking, MdBackpack, MdDashboard, MdSettings } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaPlusCircle } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isAddingOpen, setIsAddingOpen] = useState(false); // State for 'Ticket Management' dropdown
  const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false); // State for 'Accessories' dropdown
  const [isPackagesOpen, setIsPackagesOpen] = useState(false); // State for 'Packages' dropdown
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for 'Settings' dropdown
  const [isTourGuideOpen, setIsTourGuideOpen] = useState(false); // State for 'Tour Guide' dropdown
  const [isOrderOpen, setIsOrderOpen] = useState(false); // State for 'Order' dropdown

  return (
    <div className="sidebar-container bg-gray-200 text-gray-900 h-screen w-64">
      <div className="h-full p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <img src="logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-semibold ml-2">StormTravel</span>
        </div>

        <hr className="border-gray-700 mb-4" />

        <div className="space-y-2">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <MdDashboard className="w-5 h-5 mr-2 hover:text-white" />
            <span>Dashboard</span>
          </NavLink>

          {/* Ticket Management Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsAddingOpen(!isAddingOpen)}
            >
              <div className="flex items-center hover:text-white">
                <FaPlusCircle className="w-5 h-5 mr-2" />
                <span>Ticket Management</span>
              </div>
              <FaAngleDown className={`transition-transform ${isAddingOpen ? "rotate-180" : ""}`} />
            </div>
            {isAddingOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/AddBusSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Bus Schedule</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/BusSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>All Bus Schedule</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/AddFlightSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Flight Schedule</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/AddFlightSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>All Flight Schedule</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/AddTrainSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Train Schedule</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/TrainSchedule"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>All Train Schedule</span>
                  </NavLink>
                </li>
                
              </ul>
            )}
          </div>

          {/* Accessories Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsAccessoriesOpen(!isAccessoriesOpen)}
            >
              <div className="flex items-center hover:text-white">
                <MdBackpack className="w-5 h-5 mr-2 hover:text-white" />
                <span className="">Accessories</span>
              </div>
              <FaAngleDown className={`transition-transform ${isAccessoriesOpen ? "rotate-180" : ""}`} />
            </div>
            {isAccessoriesOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/AddAccessries"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Accessories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ShowAccessories"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Show Accessories</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Packages Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              <div className="flex items-center hover:text-white">
                <MdBackpack className="w-5 h-5 mr-2" />
                <span>Packages</span>
              </div>
              <FaAngleDown className={`transition-transform ${isPackagesOpen ? "rotate-180" : ""}`} />
            </div>
            {isPackagesOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/AddPackage"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Package</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ShowPackage"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Show Package</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Tour Guide Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsTourGuideOpen(!isTourGuideOpen)}
            >
              <div className="flex items-center hover:text-white">
                <MdBackpack className="w-5 h-5 mr-2" />
                <span>Tour Guide</span>
              </div>
              <FaAngleDown className={`transition-transform ${isTourGuideOpen ? "rotate-180" : ""}`} />
            </div>
            {isTourGuideOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/AddTourGuider"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Tour Guide</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ShowTourGuide"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Show Tour Guide</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Order Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsOrderOpen(!isOrderOpen)}
            >
              <div className="flex items-center hover:text-white">
                <MdBackpack className="w-5 h-5 mr-2" />
                <span>Order</span>
              </div>
              <FaAngleDown className={`transition-transform ${isOrderOpen ? "rotate-180" : ""}`} />
            </div>
            {isOrderOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/AddOrder"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Add Order</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ShowOrder"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Show Order</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Settings Dropdown */}
          <div>
            <div
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center hover:text-white">
                <MdSettings className="w-5 h-5 mr-2" />
                <span>Settings</span>
              </div>
              <FaAngleDown className={`transition-transform ${isSettingsOpen ? "rotate-180" : ""}`} />
            </div>
            {isSettingsOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/settings/profile"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Profile Settings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings/privacy"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <span>Privacy Settings</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/AuthContext'; // Import the auth context for user authentication status
import { FaUser } from 'react-icons/fa'; // Import the user icon

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Dropdown state
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Package' },
    { to: '/shop', label: 'Shop' },
    { to: '/faq-support', label: 'FAQ & Support' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuBtn = document.getElementById('menu-btn');
      if (
        isOpen &&
        sidebar &&
        menuBtn &&
        !sidebar.contains(event.target as Node) &&
        !menuBtn.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const logoutUser = () => {
    logOut();
  };

  return (
    <div>
      <nav className="bg-[#FFFFFF] px-4 py-2 font-Montserrat shadow-2xl">
        <div className="container lg:w-[85%] lg:gap-32 mx-auto flex items-center justify-between relative">
          <div className=" flex items-center font-GreatVibes justify-center italic text-[#1b82ff] text-xl font-bold">
            <img src="logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-3xl mt-2 font-semibold transform: skew(-10deg)">StormTravel</span>
          </div>
          <div className="md:hidden">
            <button
              id="menu-btn"
              className="focus:outline-none relative z-20 flex flex-col space-y-1"
              onClick={toggleSidebar}
            >
              <span
                className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block h-1 w-6 bg-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </button>
          </div>
          <div className="hidden font-semibold text-sm md:flex md:items-center md:space-x-6 list-none">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`py-2 px-2 rounded-md transition duration-300 
                    ${location.pathname === link.to
                      ? 'text-yellow-700'
                      : 'text-gray-700 hover:bg-blue-200'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Dropdown for Flight */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="py-2 px-2 rounded-md text-gray-700 hover:bg-blue-200 transition duration-300"
              >
                Bue Ticket
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <li>
                    <Link to="/flight/domestic" className="block px-4 py-2 hover:bg-blue-100">
                      Flight
                    </Link>
                  </li>
                  <li>
                    <Link to="/flight/international" className="block px-4 py-2 hover:bg-blue-100">
                      Bus
                    </Link>
                  </li>
                  <li>
                    <Link to="/flight/international" className="block px-4 py-2 hover:bg-blue-100">
                      Train
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Conditionally render Login/Logout/Profile buttons */}
          <div className="hidden lg:flex flex-row-reverse gap-2 items-center space-x-4">
            {user ? (
              <>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1"><FaUser className="mr-1" /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[170px] p-2 shadow">
                    <div className="flex flex-col h-full p-3 w-[11rem] dark:bg-gray-50 dark:text-gray-800">
                      <div className="space-y-3">

                        
                        <div className="flex-1">
                          <ul className="pt-2 pb-4 text-sm">
                            <li className="rounded-sm">
                              <Link to="/profile" className="flex items-center p-2  rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                                </svg>
                                <span>Home</span>
                              </Link>
                            </li>
                            <li className="rounded-sm">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                                <span>Search</span>
                              </a>
                            </li>
                            <li className="rounded-sm">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                                  <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                                </svg>
                                <span>Chat</span>
                              </a>
                            </li>
                            <li className="rounded-sm">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                                  <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                                  <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                                </svg>
                                <span>Orders</span>
                              </a>
                            </li>
                            <li className="rounded-sm dark:bg-gray-100 dark:text-gray-900">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span>Wishlist</span>
                              </a>
                            </li>
                            <li className="rounded-sm">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                  <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                </svg>
                                <span>Settings</span>
                              </a>
                            </li>
                            <li className="rounded-sm">
                              <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                  <rect width="32" height="64" x="256" y="232"></rect>
                                </svg>
                                <span>Logout</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                     
                    </div>
                  </ul>
                </div>
                <button
                  onClick={logoutUser}
                  className="bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full bg-green-500 transition-all duration-300 z-10 md:hidden overflow-hidden ${isOpen ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
          }`}
      >
        <div className="flex flex-col space-y-4 mt-12">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`block py-2 px-4 text-white hover:bg-blue-700 rounded-md transition duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Mobile version of the Login/Logout/Profile buttons */}
          <div className="mt-4 space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block text-white rounded-3xl px-5 py-2 text-sm font-semibold items-center"
                >
                  <FaUser className="mr-1" />
                </Link>
                <button
                  onClick={logoutUser}
                  className="block w-full bg-red-600 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

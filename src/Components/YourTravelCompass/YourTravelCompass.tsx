import React, { useState } from 'react'
import { MdFlight, MdLocalTaxi, MdTrain } from 'react-icons/md';
import { Overview } from './Overview';
import PackageComponent from '../Package/Package';
import { TourGuider } from '../TourGider/TourGuider';
import { Faq } from './Faq';

export const YourTravelCompass = () => {
    const [activeTab, setActiveTab] = useState("flight");
    return (
        <div className='w-[90%] mx-auto pb-8'>
            <div className="pt-16 pb-6  text-4xl font-bold">
                Your Travel Compass
            </div>
            <div className=' border-t border-l border-r border-gray-400   rounded-xl'>
                <div className=" z-10 rounded-lg  mx-auto p-4 ">
                    <div className="flex  shadow-sm items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
                        <div

                            onClick={() => setActiveTab("flight")} // Set active tab to flight
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${activeTab === "flight" ? "border-violet-600" : "dark:border-gray-300"
                                } dark:text-gray-600`}
                        >
                            <MdFlight className="text-yellow-700 mr-2" /> Overview
                        </div>
                        <div

                            onClick={() => setActiveTab("bus")} // Set active tab to bus
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${activeTab === "bus" ? "border-violet-600" : "dark:border-gray-300"
                                } dark:text-gray-600`}
                        >
                            <MdLocalTaxi className="text-yellow-700 mr-2" /> Our Packages
                        </div>
                        <div

                            onClick={() => setActiveTab("train")} // Set active tab to train
                            className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${activeTab === "train" ? "border-violet-600" : "dark:border-gray-300"
                                } dark:text-gray-900`}
                        >
                            <MdTrain className="text-yellow-700 mr-2" /> FAQ
                        </div>

                    </div>
                    <hr className='-ml-0 h-[1px] border-none bg-slate-200 mx-auto w-[100%]' />
                    {/* Render the active search bar based on the selected tab */}
                    {activeTab === "flight" && <div><Overview></Overview></div>}
                    {activeTab === "bus" && <div><PackageComponent></PackageComponent></div>}
                    {activeTab === "train" && <div><Faq></Faq></div>}
                </div>

            </div>
        </div>
    )
}

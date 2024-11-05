import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHandPointer } from "react-icons/fa6";
import { SiAmazonpay } from "react-icons/si";
const StepSection: React.FC = () => {
  return (
    <div>
      <div className="step-section text-center">
        <div className="pt-8 pb-3 text-4xl font-bold ">
          <span className="text-blue-700">Buy tickets </span>in 3 easy steps
        </div>
      </div>
      {/* <div className='p-3 text-4xl font-bold ' ><span className='text-blue-700'></span> in 3 easy steps</div> */}
      <section className="p-6 lg:w-[85%] mx-auto dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto grid justify-center grid-cols-2 text-center gap-3 lg:grid-cols-3">
          <div className="flex  items-center gap-0">
            <IoSearchOutline color="#3B82F6" size={150} />
            <div className="flex text-start flex-col justify-start m-2 ">
              <p className="text-4xl font-semibold  lg:text-4xl">Search</p>
              <p className="text-sm sm:text-base">
                Choose your origin, destination, journey dates and search for
                buses
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-0">
            <FaRegHandPointer color="#3B82F6" size={100} />
            <div className="flex text-start flex-col justify-start m-2 ">
              <p className="text-4xl font-semibold  lg:text-4xl">Select</p>
              <p className="text-sm sm:text-base">
                Select your desired trip and choose your seats
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-0">
            <SiAmazonpay color="#3B82F6" size={150} />
            <div className="flex text-start flex-col justify-start m-2 ">
              <p className="text-4xl font-semibold  lg:text-4xl">Pay</p>
              <p className="text-sm sm:text-base">
                Choose your origin, destination, journey dates and search for
                buses
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepSection;

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHandPointer } from "react-icons/fa6";
import { SiAmazonpay } from "react-icons/si";

const StepSection: React.FC = () => {
  return (
    <div>
      <div className="step-section text-center">
        <div className="pt-8 pb-3 text-3xl sm:text-4xl font-bold">
          <span className="text-blue-700">Buy tickets </span>in 3 easy steps
        </div>
      </div>

      <section className="p-6 mx-auto dark:text-gray-800">
        <div className="container lg:w-[85%] mx-auto grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-3">
            <IoSearchOutline color="#3B82F6" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
            <div className="flex text-start flex-col justify-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Search</p>
              <p className="text-sm sm:text-base">
                Choose your origin, destination, journey dates and search for buses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaRegHandPointer color="#3B82F6" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
            <div className="flex text-start flex-col justify-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Select</p>
              <p className="text-sm sm:text-base">
                Select your desired trip and choose your seats
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SiAmazonpay color="#3B82F6" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
            <div className="flex text-start flex-col justify-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Pay</p>
              <p className="text-sm sm:text-base">
                Pay for your tickets securely and receive confirmation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepSection;
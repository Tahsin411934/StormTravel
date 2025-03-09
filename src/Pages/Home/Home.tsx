import React from 'react';
import Banner from '../../Components/Banner/Banner';
import StepSection from '../../Components/StepSection/StepSection';
import Package from '../../Components/Package/Package';
import { PayWith } from '../../Components/PayWith/PayWith';
import { Accessories } from '../../Components/Accessories/Accessories';
import { YourTravelCompass } from '../../Components/YourTravelCompass/YourTravelCompass';
import { TourGuider } from '../../Components/TourGider/TourGuider';
import { FloatingCart } from '../../Components/Cart/FloatingCart';


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <StepSection></StepSection>
      <div className="bg-[#EBF0F4]">
        <Package></Package>
        <YourTravelCompass></YourTravelCompass>
        <TourGuider />
        <Accessories></Accessories>
         {/* Newsletter Subscription */}
         <div className="container mx-auto w-[90%] mt-20 bg-blue-900 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-300 mb-6">
              Get the latest travel deals, tips, and news straight to your
              inbox.
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button className="bg-yellow-400 text-blue-950 px-6 py-2 rounded-r-lg hover:bg-yellow-500 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        <PayWith></PayWith>
      </div>

      {/* Floating Cart Button */}
      <FloatingCart />
    </div>
  );
};

export default Home;
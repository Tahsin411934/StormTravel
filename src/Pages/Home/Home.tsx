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
        <PayWith></PayWith>
      </div>

      {/* Floating Cart Button */}
      <FloatingCart />
    </div>
  );
};

export default Home;
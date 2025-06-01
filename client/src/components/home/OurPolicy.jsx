import React from "react";
import { assets } from "../../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-0 md:flex-row md:justify-around items-center py-20">
      <div className="flex flex-col items-center">
        <img src={assets.exchange_icon} alt="" className="w-12 mb-5" />
        <p className="font-semibold text-sm md:text-md">Easy Exchange Policy</p>
        <p className="text-sm md:text-md text-gray-400">We offer hassle free exchange policy.</p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.quality_icon} alt="" className="w-12 mb-5" />
        <p className="font-semibold text-sm md:text-md">7 Days Return Policy</p>
        <p className=" text-sm md:text-md text-gray-400">We provide 7 days free return policy.</p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.support_img} alt="" className="w-12 mb-5" />
        <p className="font-semibold text-sm md:text-md">Best Customer Support</p>
        <p className="text-sm md:text-md text-gray-400">We provide 24/7 customer support.</p>
      </div>
    </div>
  );
};

export default OurPolicy;

  import React from "react";
import heroImg from "../../assets/hero_img.png";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row border border-gray-400">
        {/* Hero Text */}
        <div className=" flex justify-center items-center md:w-1/2 py-10 md:py-0">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2">
              <div className="bg-gray-700 w-14 h-0.5"></div>
              <p className="text-sm md:text-md text-gray-700 font-medium">
                OUR BESTSELLERS
              </p>
            </span>
            <span className="text-3xl md:text-5xl text-gray-700 font-medium latest-arrival">
              Latest Arrivals
            </span>
            <span className="flex items-center gap-2">
              <p className="text-sm md:text-md text-gray-700 font-medium">
                SHOP NOW
              </p>
              <div className="bg-gray-700 w-14 h-0.5"></div>
            </span>
          </div>
        </div>

        {/* Hero img */}
        <div className="md:w-1/2">
          <img src={heroImg} alt="hero-img" />
        </div>
      </div>
    </>
  );
};

export default Hero;

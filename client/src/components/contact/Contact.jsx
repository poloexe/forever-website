import React from "react";
import { assets } from "../../assets/assets";
import NewsLetter from "../home/NewsLetter";

const Contact = () => {
  return (
    <div className="flex flex-col gap-28">
      <div className="flex flex-col items-center gap-12 pt-6">
        <h1 className="flex items-center md:flex-row gap-2 text-2xl text-gray-400">
          <span>CONTACT</span>
          <span className="font-medium text-gray-700">US</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          <img
            src={assets.contact_img}
            alt="about_img"
            className="w-[450px] object-cover"
          />

          <div className="flex flex-col gap-6 md:gap-0 justify-around py-12">
            <h1 className="flex text-2xl items-center text-gray-700 font-semibold leading-relaxed">
              Our Store
            </h1>

            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>

            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              Tel: (415) 555-0132 <br />
              Email: admin@forever.com
            </p>

            <h1 className="flex text-2xl items-center text-gray-700 font-semibold leading-relaxed">
              Careers at Forever
            </h1>

            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              Learn more about our teams and job openings.
            </p>

            <div>
              <button className="py-4 px-7 border text-sm cursor-pointer hover:text-white hover:bg-black">Explore Jobs</button>
            </div>
          </div>
        </div>
      </div>

      {/* NewsLetter */}
      <NewsLetter />
    </div>
  );
};

export default Contact;

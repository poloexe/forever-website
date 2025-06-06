import React from "react";
import { assets } from "../../assets/assets";
import NewsLetter from "../home/NewsLetter";

const About = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-14">
      <div className="flex flex-col items-center gap-12 pt-6">
        <h1 className="flex items-center md:flex-row gap-2 text-2xl text-gray-400">
          <span>ABOUT</span>
          <span className="font-medium text-gray-700">US</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          <img
            src={assets.about_img}
            alt="about_img"
            className="w-full md:w-[450px] object-cover"
          />

          <div className="flex flex-col gap-6 md:gap-0 md:justify-around w-full md:w-1/2 py-12">
            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>

            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>

            <p className="flex items- font-bold text-gray-800 text-base leading-relaxed">
              Our Mission
            </p>

            <p className="flex items-center text-gray-700 text-base leading-relaxed">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="flex items-center md:flex-row gap-1 text-xl text-gray-400">
          <span>WHY</span>
          <span className="font-medium text-gray-700">CHOOSE</span>
          <span className="font-medium text-gray-700">US</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-4 border border-gray-300 px-10 py-10 md:py-24 md:px-20">
            <h4 className="font-semibold text-sm">Quality Assurance:</h4>
            <p className="text-sm text-gray-700">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-gray-300 px-10 py-10 md:py-24 md:px-20">
            <h4 className="font-semibold text-sm">Convenience:</h4>
            <p className="text-sm text-gray-700">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="flex flex-col gap-4 border border-gray-300 px-10 py-10 md:py-24 md:px-20">
            <h4 className="font-semibold text-sm">
              Exceptional Customer Servicee:
            </h4>
            <p className="text-sm text-gray-700">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;

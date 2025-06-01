import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col gap-10 mt-40">
        {/* Top Part */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          <div className="flex flex-col gap-5 mb-10 md:mb-0">
            <img src={assets.logo} alt="logo" className="w-36" />

            <p className="text-sm text-gray-600 w-full md:w-2/3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              dolores a laboriosam! Aperiam ab quibusdam dolor nostrum tenetur
              sint dolorum odit enim nulla aliquam facilis repellat provident,
              minima Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Sit.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-end gap-20 md:gap-28">
            <div className="flex flex-col gap-5 w-[10rem]">
              <h1 className="text-xl font-md">COMPANY</h1>
              <div className="flex flex-col text-sm text-gray-600 gap-1">
                <Link>Home</Link>
                <Link>About us</Link>
                <Link>Delivery</Link>
                <Link>Privacy Policy</Link>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-[10rem]">
              <h1 className="text-xl font-md">GET IN TOUCH</h1>

              <div className="flex flex-col gap-1">
                <a href="" className="text-sm text-gray-600">
                  +234-000-000-0000
                </a>

                <a href="" className="text-sm text-gray-600">
                  wewewe@gmail.com
                </a>

                <a href="" target="blank" className="text-sm text-gray-600">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className=" text-gray-300"/>

          <p className="text-center text-sm py-6">
            Copyright {currentYear} @ Baruch - All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

import React from "react";

const NewsLetter = () => {
  return (
    <>
      <div className="flex flex-col gap-8 md:gap-3 items-center">
        <div className="flex flex-col justify-center gap-3">
          <h1 className="text-2xl text-center text-gray-800 font-semibold">
            Subscribe now & get 20% off
          </h1>
          <p className="text-gray-400 text-center">
            Subscribe to get 20% off and stay updated with exclusive offers.
          </p>
        </div>

        {/* Input Section */}
        <div className="md:w-1/2 flex">
          <input
            type="email"
            className="w-full border-1 px-3 border-gray-400 outline-none"
            placeholder="Enter your email"
          />
          <button className="btn text-xs py-4 px-6 bg-black text-white">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;

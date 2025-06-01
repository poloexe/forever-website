import React from "react";

const   CartTotal = ({ getTotalCartAmount, currency, deliveryFee }) => {
  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <h1 className="flex flex-col md:flex-row gap-2 items-center text-2xl text-gray-400 ">
          <span>CART</span>
          <span className="font-medium text-gray-700">TOTAL</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2.5">
            <span className="text-sm flex justify-between">
              <p>Subtotal</p>
              <p>
                {currency} {getTotalCartAmount()}
              </p>
            </span>

            <hr className="text-gray-200" />
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm flex justify-between">
              <p>Shipping Fee</p>
              <p>
                {currency} {deliveryFee}
              </p>
            </span>

            <hr className="text-gray-200" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-sm flex justify-between">
              <p>Total</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryFee}
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;

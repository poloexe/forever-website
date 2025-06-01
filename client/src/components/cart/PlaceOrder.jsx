import { useContext } from "react";
import CartTotal from "./CartTotal";
import { ShopContext } from "../context/ShopContext";
import PaymentMethod from "./PaymentMethod";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, currency, deliveryFee } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      {/* Left Side  */}
      <div className="flex flex-col gap-10 mt-15 py-4 w-[480px]">
        <div className="flex items-center md:flex-row gap-2 text-2xl text-gray-400">
          <span>DELIVERY</span>
          <span className="font-medium text-gray-700">INFORMATION</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </div>

        <form action="" className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
          </div>

          <input
            type="email"
            placeholder="Enter Email"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
          />

          <input
            type="text"
            placeholder="Street"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="City"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
            <input
              type="text"
              placeholder="State"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
          </div>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Zipcode"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
            />
          </div>

          <input
            type="number"
            placeholder="Phone"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
          />
        </form>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-between mt-25 pt-5">
        <CartTotal
          getTotalCartAmount={getTotalCartAmount}
          currency={currency}
          deliveryFee={deliveryFee}
        />

        <PaymentMethod />

        <div className="flex justify-end">
          <button
            className="text-sm px-8 py-4 bg-black text-white cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

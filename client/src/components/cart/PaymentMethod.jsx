import { assets } from "../../assets/assets";

const PaymentMethod = ({ method, setMethod }) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center md:flex-row gap-2 text-md text-gray-400">
          <span>PAYMENT</span>
          <span className="font-medium text-gray-700">METHOD</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Stripe */}
          <div
            className="flex gap-3 px-3 py-2 items-center border-1 border-gray-300 cursor-pointer"
            onClick={() => setMethod("stripe")}
          >
            <p
              className={`rounded-full h-3 w-3 border-1 border-gray-300 ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></p>
            <img src={assets.stripe_logo} alt="stripe" className="h-5 mx-2" />
          </div>

          {/* Razor */}
          <div
            className="flex gap-3 px-3 py-2 items-center border-1 border-gray-300 cursor-pointer"
            onClick={() => setMethod("razor")}
          >
            <p
              className={`rounded-full h-3 w-3 border-1 border-gray-300 ${
                method === "razor" ? "bg-green-400" : ""
              }`}
            ></p>
            <img src={assets.razorpay_logo} alt="stripe" className="h-5 mx-2" />
          </div>

          {/* Cash */}
          <div
            className="flex gap-3 px-3 py-2 items-center border-1 border-gray-300 cursor-pointer"
            onClick={() => setMethod("cash")}
          >
            <p
              className={`rounded-full h-3 w-3 border-1 border-gray-300 ${
                method === "cash" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-sm text-gray-500 font-medium">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;

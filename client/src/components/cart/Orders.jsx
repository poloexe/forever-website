import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderData } from "../../hooks/useOrderData";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const queryClient = useQueryClient();
  const { data: orderData = [] } = useOrderData();

  return (
    <>
      <div className="flex flex-col gap-4 pt-15">
        {/* Title */}
        <h1 className="flex items-center md:flex-row gap-2 text-2xl text-gray-400">
          <span>MY</span>
          <span className="font-medium text-gray-700">ORDERS</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        <div>
          {/* Orders */}
          {orderData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0 py-4 border-b border-t border-gray-300"
            >
              <div className="flex gap-6">
                <img
                  src={product.image[0].url}
                  alt=""
                  className="w-20 md:w-24"
                />

                <div className="flex flex-col gap-1.5">
                  <p className="text-sm md:text-base text-gray-700 font-medium">
                    {product.name}
                  </p>
                  <p className="flex gap-2 text-sm md:text-base text-gray-700">
                    <span>
                      {currency} {product.price}
                    </span>
                    <span>Quantity: {product.quantity}</span>
                    <span>Size: {product.size}</span>
                  </p>
                  <p className="text-xs md:text-sm">
                    Date:{" "}
                    <span className="text-gray-400">
                      {product.date
                        ? new Date(product.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </p>
                  <p className=" text-xs md:text-sm">
                    Payment:{" "}
                    <span className="text-gray-400">
                      {product.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex w-full md:w-1/2 justify-between items-center">
                <div className="flex gap-2 items-center text-xs md:text-base">
                  <p className="h-2 w-2 rounded-full bg-green-400"></p>
                  <p>{product.status}</p>
                </div>

                <div className="border border-gray-300 py-1 px-3">
                  <button
                    className="text-xs md:text-sm cursor-pointer"
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: ["orders"] });
                    }}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;

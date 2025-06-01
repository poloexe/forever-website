import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  const newProducts = products.slice(2, 4);
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
          {newProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 border-b border-t border-gray-300"
            >
              <div className="flex gap-6">
                <img src={product.image[0].url} alt="" className="w-24" />

                <div className="flex flex-col gap-1.5">
                  <p className="text-base text-gray-700 font-medium">
                    {product.name}
                  </p>
                  <p className="flex gap-2 text-base text-gray-700">
                    <span>
                      {currency} {product.price}
                    </span>
                    <span>Quantity: 1</span>
                    <span>Size: M</span>
                  </p>
                  <p className="text-sm">
                    Date: <span className="text-gray-400">23rd March 2021</span>
                  </p>
                  <p className="text-sm">
                    Payment: <span className="text-gray-400">COD</span>
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex w-1/2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p className="h-2 w-2 rounded-full bg-green-400"></p>
                  <p>Ready to ship</p>
                </div>

                <div className="border border-gray-300 py-1 px-3">
                  <button className="text-sm">Track Order</button>
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

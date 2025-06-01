import React from "react";

const CartData = ({
  cartData,
  products,
  currency,
  handleUpdateQuantity,
  assets,
}) => {
  return (
    <>
      <div>
        {cartData.map((data, index) => {
          const product = products.find((item) => item._id === data._id);

          return (
            <div
              key={index}
              className="flex items-center justify-between border-t border-b border-gray-200 py-5"
            >
              <div className="flex gap-6 w-[50%]">
                <img src={product.image[0].url} alt="img" className="w-20" />

                <div className="flex flex-col gap-2 h-fit">
                  <p className="text-lg font-medium">{product.name}</p>

                  {/* Price and Size */}
                  <div className="flex items-center gap-5 font-light">
                    <p>
                      {currency} {product.price}
                    </p>

                    <p className="px-3 py-1 border border-gray-200 bg-gray-50">
                      {data.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                className="max-w-20 max-h-10 border border-gray-200 py-2 px-3 text-sm"
                min={1}
                defaultValue={data.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : handleUpdateQuantity(
                        data._id,
                        data.size,
                        Number(e.target.value)
                      )
                }
              />

              <img
                src={assets.bin_icon}
                alt="bin-icon"
                className="w-5 cursor-pointer"
                onClick={() => handleUpdateQuantity(data._id, data.size, 0)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CartData;

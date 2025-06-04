import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import CartData from "./CartData";
import CartTotal from "./CartTotal";

const Cart = () => {
  const {
    currency,
    cart,
    products,
    updateQuantity,
    getTotalCartAmount,
    deliveryFee,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const handleUpdateQuantity = (productId, size, quantity) => {
    toast.success("Cart Updated");
    updateQuantity(productId, size, quantity);
  };

  useEffect(() => {
    const tempData = [];
    for (let products in cart) {
      for (let product in cart[products]) {
        if (cart[products][product] > 0) {
          tempData.push({
            _id: products,
            size: product,
            quantity: cart[products][product],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cart]);

  console.log("Cart: ", cart);

  return (
    <>
      <div className="pt-14 border-t-1 border-gray-200">
        <div className="flex flex-col gap-8">
          {/* Header Text */}
          <h1 className="flex flex-col md:flex-row gap-2 items-center text-2xl text-gray-400 ">
            <span>YOUR</span>
            <span className="font-medium text-gray-700">CART</span>
            <span className="h-0.5 w-14 bg-gray-700"></span>
          </h1>

          {/* Cart */}
          <CartData
            cartData={cartData}
            products={products}
            currency={currency}
            handleUpdateQuantity={handleUpdateQuantity}
            assets={assets}
          />
        </div>

        <div className="flex flex-col items-end gap-8 my-14">
          <div className="w-[28rem]">
            <CartTotal
              getTotalCartAmount={getTotalCartAmount}
              currency={currency}
              deliveryFee={deliveryFee}
            />
          </div>

          <div>
            <button
              className="text-sm px-8 py-4 bg-black text-white cursor-pointer"
              onClick={() => navigate("/place-order")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

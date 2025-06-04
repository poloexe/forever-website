import { useContext, useRef } from "react";
import CartTotal from "./CartTotal";
import { ShopContext } from "../context/ShopContext";
import PaymentMethod from "./PaymentMethod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cash");
  const {
    getTotalCartAmount,
    cart,
    setCart,
    currency,
    deliveryFee,
    navigate,
    products,
  } = useContext(ShopContext);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: submitTheForm } = useMutation({
    mutationFn: async () => {
      try {
        const orderItems = [];

        for (const items in cart) {
          for (const item in cart[items]) {
            if (cart[items][item] > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === items)
              );

              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = cart[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }

        console.log("Order Items: ", orderItems);

        let orderData = {
          address: formData,
          items: orderItems,
          amount: getTotalCartAmount() + deliveryFee,
        };

        switch (method) {
          case "cash":
            // Fetching payload
            const res = await fetch(
              "https://forever-website-1mf9.onrender.com/api/order/place-order/cash",
              {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(orderData),
              }
            );

            const payload = await res.json();

            if (!res.ok) throw new Error(payload.msg || "Could not send order");
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Order successful");
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    submitTheForm();
  };

  return (
    <div className="flex justify-between">
      {/* Left Side  */}
      <form
        ref={formRef}
        className="flex flex-col gap-10 mt-15 py-4 w-[480px]"
        onSubmit={submitForm}
      >
        <div className="flex items-center md:flex-row gap-2 text-2xl text-gray-400">
          <span>DELIVERY</span>
          <span className="font-medium text-gray-700">INFORMATION</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.lastName}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
            onChange={handleInputChange}
            value={formData.email}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
            onChange={handleInputChange}
            value={formData.street}
            required
          />

          <div className="flex gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.city}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.state}
              required
            />
          </div>

          <div className="flex gap-3">
            <input
              type="number"
              name="zipCode"
              placeholder="Zipcode"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.zipCode}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="px-3.5 py-1.5 rounded-md border-1 border-gray-300 w-full"
              onChange={handleInputChange}
              value={formData.country}
              required
            />
          </div>

          <input
            type="number"
            name="phone"
            placeholder="Phone"
            className="px-4 py-2 rounded-md border-1 border-gray-300"
            onChange={handleInputChange}
            value={formData.phone}
            required
          />
        </div>
      </form>

      {/* Right Side */}
      <div className="flex flex-col justify-between mt-25 pt-5">
        <CartTotal
          getTotalCartAmount={getTotalCartAmount}
          currency={currency}
          deliveryFee={deliveryFee}
        />

        <PaymentMethod method={method} setMethod={setMethod} />

        <div className="flex justify-end">
          <button
            className="text-sm px-8 py-4 bg-black text-white cursor-pointer"
            onClick={() => formRef.current && formRef.current.requestSubmit()}
            type="submit"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

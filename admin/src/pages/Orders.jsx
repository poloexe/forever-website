import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assets } from "../assets/assets";
import { currency } from "../App";

const Orders = () => {
  const { data: orderData = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://forever-website-1mf9.onrender.com/api/order/admin/lists",
          {
            credentials: "include",
          }
        );

        const payload = await res.json();

        if (!res.ok) throw new Error(payload.msg || "Could not get orders");
        return payload.orders;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ status, orderId }) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/order/admin/status",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ status, orderId }),
          credentials: "include",
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Could not update status");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleOrderStatus = (status, orderId) => {
    updateStatus({ status, orderId });
  };

  return (
    <div className="ml-20 mt-6 flex flex-col gap-4">
      <h3>Orders</h3>

      <div className="flex flex-col gap-3">
        {/* Orders */}
        {orderData.map((order, index) => (
          <div
            key={index}
            className="border border-gray-400 gap-4 grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] px-6 py-6 text-sm text-gray-700 font-light"
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                {order.items.map((item, index) => {
                  return (
                    <p key={index} className="">
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-medium">
                  {order.address.firstName} {order.address.lastName}
                </h1>

                <p>
                  {order.address.street}, {order.address.city} <br />
                  {order.address.state}, {order.address.country},{" "}
                  {order.address.zipCode}
                </p>
              </div>
            </div>

            <div>
              <p>Items: {order.items.length}</p>

              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>
                Date: {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Price */}
            <div>
              <p>
                Amount: {currency} {order.amount}
              </p>
            </div>

            {/* Status */}

            <div>
              <select
                className="w-full p-2 font-semibold border border-gray-400 rounded-md bg-gray-200 cursor-pointer"
                value={order.status}
                onChange={(e) => handleOrderStatus(e.target.value, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

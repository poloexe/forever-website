import { assets } from "../assets/assets";
import { currency } from "../App";
import { useOrderData } from "../hooks/userOrderData";
import { useUpdateStatus } from "../hooks/useUpdateStatus";

const Orders = () => {
  const { data: orderData = [] } = useOrderData();

  const { mutate: updateStatus } = useUpdateStatus();

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

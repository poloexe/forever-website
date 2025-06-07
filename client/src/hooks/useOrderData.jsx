import { useQuery } from "@tanstack/react-query";

export const useOrderData = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/order/user/lists",
        {
          credentials: "include",
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Could not get orders");

      const allOrderItems = [];

      payload.orders.map((order) =>
        order.items.map((item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.createdAt;

          allOrderItems.push(item);
        })
      );

      return allOrderItems.reverse();
    },
    retry: false,
  });
};

import { useQuery } from "@tanstack/react-query";

export const useOrderData = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/order/admin/lists",
        {
          credentials: "include",
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Could not get orders");
      return payload.orders;
    },
    retry: false,
  });
};

import { useQuery } from "@tanstack/react-query";

export const useUserCart = () => {
  return useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/cart/fetchcart",
        {
          credentials: "include",
        }
      );

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.msg || "Something went wrong");

      return payload;
    },
    retry: false,
  });
};

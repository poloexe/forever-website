import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/product/all"
      );
      const payload = await res.json();

      if (!res.ok) throw new Error(payload.message || "Something went wrong");

      return payload.products;
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, size }) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/cart/add",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId, size }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to add to cart");

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userCart"]);
    },
  });
};

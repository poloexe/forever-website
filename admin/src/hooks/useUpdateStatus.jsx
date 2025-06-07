import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Login Success!");
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
      navigate("/add");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

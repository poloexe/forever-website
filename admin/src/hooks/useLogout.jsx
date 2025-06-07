import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Something went wrong");
    },

    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Logout Success!");
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
      navigate("/");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../components/context/ShopContext";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useContext(ShopContext);

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setUser(null);
      navigate("/auth");
      toast.success("Logged out!...👋🏾");
    },
  });
};

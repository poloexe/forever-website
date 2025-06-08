import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRegisterUser = (setCurrentState) => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Registered Successfully 👌");
      setCurrentState("Login");
    },
  });
};

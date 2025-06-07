import { assets } from "../assets/assets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
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

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex justify-between px-18 py-2 items-center border-b border-gray-200">
      <img src={assets.logo} alt="logo" className="w-36" />

      <button
        onClick={handleLogout}
        className={`cursor-pointer px-8 py-3 bg-gray-700 text-white text-sm font-semibold rounded-full ${
          isPending ? "opacity-5" : ""
        }`}
        disabled={isPending}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

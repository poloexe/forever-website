import { assets } from "../assets/assets";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { mutate: logout, isPending } = useLogout();

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

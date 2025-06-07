import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MobileMenu from "../mobile/MobileMenu";

const NavBar = () => {
  const navLinks = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "COLLECTION",
      link: "/collections",
    },
    {
      name: "ABOUT",
      link: "/about",
    },
    {
      name: "CONTACT",
      link: "/contact",
    },
  ];
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser, getCartTotal } = useContext(ShopContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
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
      toast.success("Logged out!...👋🏾");
      navigate("/auth");
    },
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    setShowMenu(false);
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center py-5">
        <Link to="/">
          <img src={assets.logo} alt="logo-img" className="w-28 md:w-36" />
        </Link>

        <div className="hidden lg:flex gap-5 items-center">
          {navLinks.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              className="text-sm text-gray-700 flex flex-col items-center gap-0.5"
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <hr className="h-[1.5px] bg-gray-700 w-5 text-center" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <a
            href="http://localhost:4000/admin/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 border border-gray-200 rounded-full px-4 py-2 font-medium"
          >
            Admin Panel
          </a>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center">
            {/* Search Bar */}
            <SearchBar />
          </div>

          <div className="group relative">
            <Link
              to={user ? "" : "/auth"}
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src={assets.profile_icon}
                alt="profile-icon"
                className="cursor-pointer w-4 md:w-5"
              />
            </Link>

            {user && (
              <div
                className={`${
                  showMenu ? "block" : "hidden"
                } md:group-hover:block absolute right-0 pt-5`}
              >
                {/* Dropdown menu */}
                <div className="flex flex-col gap-2 w-32 pl-4 py-4 text-gray-500 bg-slate-100 rounded-lg">
                  <p className="hover:text-black cursor-pointer">Profile</p>
                  <p
                    className="hover:text-black cursor-pointer"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <p
                    className="hover:text-black cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative cursor-pointer">
            <img
              src={assets.cart_icon}
              alt="cart-icon"
              className="w-4 md:w-5"
            />
            <p className="absolute rounded-full h-4 w-4 bg-black text-[8px] leading-4 text-white text-center right-[-5px] bottom-[-5px]">
              {getCartTotal()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <div>
            <img
              src={assets.menu_icon}
              alt="menu-icon"
              className="lg:hidden w-4.5 md:w-5"
              onClick={() => setVisible(true)}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            visible={visible}
            setVisible={setVisible}
            navLinks={navLinks}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;

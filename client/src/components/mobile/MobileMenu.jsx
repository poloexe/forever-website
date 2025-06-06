import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const MobileMenu = ({ visible, setVisible, navLinks }) => {
  return (
    <div
      className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
        visible ? "w-full z-50" : "w-0"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div
          onClick={() => setVisible(false)}
          className="flex gap-4 items-center text-gray-600 p-4 font-semibold"
        >
          <img src={assets.dropdown_icon} className="h-4 rotate-180" />

          <p>Back</p>
        </div>

        <div className="flex flex-col">
          {navLinks.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              className={({ isActive }) =>
                `py-2 pl-6 border border-gray-200 ${
                  isActive ? "bg-black text-white" : "text-black bg-white"
                }`
              }
              onClick={() => setVisible(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to=""
            className={({ isActive }) =>
              `py-2 pl-6 border border-gray-200 ${isActive ? "" : ""}`
            }
            onClick={() => setVisible(false)}
          >
            ADMIN PANEL
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

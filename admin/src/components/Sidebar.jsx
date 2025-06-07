import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-h-screen w-[18%] border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pl-12 mt-6">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-300 pl-2 py-2 rounded-sm cursor-pointer ${
              isActive ? "active-add" : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="add-icon" className="w-5 h-5" />
          <p className="text-md">Add Item</p>
        </NavLink>

        {/* List Itmes */}
        <NavLink
          to="/lists"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-300 pl-2 py-2 rounded-sm cursor-pointer ${
              isActive ? "active-add" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="add-icon" className="w-5 h-5" />
          <p className="text-md">List Item</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-300 pl-2 py-2 rounded-sm cursor-pointer ${
              isActive ? "active-add" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="add-icon" className="w-5 h-5" />
          <p className="text-md">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

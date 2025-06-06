import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const isCollectionsPage = location.pathname.includes("collections");

  return (
    <>
      <div className="relative border-2 border-gray-400 rounded-full transition-all duration-300">
        <input
          type="text"
          className={`bg-gray-50 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out ${
            isCollectionsPage && focused ? "w-40 md:w-64" : "w-8 md:w-12"
          }`}
          placeholder={isCollectionsPage ? "Search..." : ""}
          onFocus={() => {
            if (!isCollectionsPage) {
              navigate("/collections");
              setFocused(true);
            } else {
              setFocused(true);
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocused(false);
            }
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-4"
          disabled={!isCollectionsPage}
        >
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchBar;

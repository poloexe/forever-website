import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import AllCollections from "./AllCollections";

const Collection = () => {
  const { products, currency, search } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevance");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      const removedProducts = (prev) =>
        prev.filter((product) => product !== e.target.value);
      setCategory(removedProducts);
    } else {
      const addedProducts = (prev) => [...prev, e.target.value];
      setCategory(addedProducts);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      const removedProducts = (prev) =>
        prev.filter((product) => product !== e.target.value);
      setSubCategory(removedProducts);
    } else {
      const addedProducts = (prev) => [...prev, e.target.value];
      setSubCategory(addedProducts);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  const applySort = () => {
    let productsCopy = products.slice();

    if (sortType === "low-high") {
      productsCopy = productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productsCopy = productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search]);

  useEffect(() => {
    applySort();
  }, [sortType]);

  return (
    <>
      <div className="">
        <div className="flex gap-10">
          {/* FIlter Setion */}
          <div className="min-w-60 flex flex-col gap-5">
            <h1 className="text-xl cursor-poiner">FILTERS</h1>

            {/* Category section */}
            <div className="flex flex-col gap-3 border border-gray-400 pl-6 py-6">
              <h1 className="text-sm font-medium">CATEGORIES</h1>

              {/* Input checkboxes */}
              <div className="flex flex-col justify-center  gap-2 text-sm text-gray-700 font-light">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Men"
                    onChange={toggleCategory}
                  />
                  Men
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={toggleCategory}
                  />
                  Women
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Kids"
                    onChange={toggleCategory}
                  />
                  Kids
                </p>
              </div>
            </div>

            {/* Type Section - Sub category */}
            <div className="flex flex-col gap-3 border border-gray-400 pl-6 py-6">
              <h1 className="text-sm font-medium">TYPE</h1>

              {/* Input checkboxes */}
              <div className="flex flex-col justify-center  gap-2 text-sm text-gray-700 font-light">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Topwear"
                    onChange={toggleSubCategory}
                  />
                  Top Wear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Bottomwear"
                    onChange={toggleSubCategory}
                  />
                  Bottom Wear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value="Winterwear"
                    onChange={toggleSubCategory}
                  />
                  Winter Wear
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="text-gray-500 font-medium text-2xl flex gap-2 items-center">
                ALL <span className="text-gray-700">COLLECTIONS</span>
                <div className="bg-gray-700 w-14 h-0.5"></div>
              </h1>

              <select
                className="border-2 border-gray-400 rounded-lg py-2 px-2 text-sm"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <AllCollections
                filteredProducts={filteredProducts}
                currency={currency}
              />
            ) : (
              <div className="flex h-full justify-center items-center text-gray-500 text-lg">
                <p>
                  No results found. Please try a different search or filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center">
        {/* Latest Collections Text */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-center text-2xl sm:text-3xl text-gray-400">
            <span>LATEST</span>
            <span className="font-medium text-gray-700">COLLECTIONS</span>
            <span className="h-0.5 w-14 bg-gray-700"></span>
          </div>

          <p className="text-xs sm:text-sm md:text-md text-center text-gray-700">
            Discover the finest trends in fashion and style, crafted to
            perfection for you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {latestProducts.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={index}
              className="flex flex-col gap-2"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image[0].url}
                  className="hover:scale-110 transition ease-in-out"
                />
              </div>

              <p className="text-gray-700 text-xs md:text-sm">{product.name}</p>
              <p className=" text-gray-700 text-xs font-semibold">
                {currency} {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestCollection;

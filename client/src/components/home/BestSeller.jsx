import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext);
  const [bestSellers, SetBestSellers] = useState([]);

  useEffect(() => {
    const bestSellers = products.filter(
      (product) => product.bestSeller === true
    );

    SetBestSellers(bestSellers.slice(0, 5));
  }, [products]);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-2 items-center justify-center text-2xl sm:text-3xl text-gray-400">
            <span>BEST</span>
            <span className="font-medium text-gray-700">SELLERS</span>
            <span className="h-0.5 w-14 bg-gray-700"></span>
          </div>

          <p className="text-xs sm:text-sm md:text-md text-gray-700 text-center">
            Explore our top-rated products, loved by customers for their quality
            and style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {bestSellers.map((bestSeller, index) => (
            <Link
              to={`/product/${bestSeller._id}`}
              key={index}
              className="flex flex-col gap-2"
            >
              <div className="overflow-hidden">
                <img
                  src={bestSeller.image[0].url}
                  className="hover:scale-110 transition ease-in-out"
                />
              </div>

              <p className="text-gray-700 text-xs md:text-sm">
                {bestSeller.name}
              </p>
              <p className=" text-gray-700 text-xs font-semibold">
                {currency} {bestSeller.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;

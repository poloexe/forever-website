import { Link } from "react-router-dom";

const AllCollections = ({ filteredProducts, currency }) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
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

export default AllCollections;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../assets/assets";
import RelatedProducts from "./RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { products, currency, addToCart, user } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === productId);

    if (product) {
      setProductData(product);
      setImage(product.image[0].url);
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Select a size");
    } else {
      addToCart(productData._id, size);
      toast.success("Added to cart");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return (
    <div
      className={`flex flex-col gap-10 pt-10 transition-opacity ease-in duration-500 ${
        !productData ? "opacity-0" : "opacity-100"
      }`}
    >
      {!productData ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col-reverse md:flex-row gap-3 h-fit">
            {/* Thumbnail img */}
            <div className="flex flex-row md:flex-col justify-between">
              {productData?.image?.map((item, index) => (
                <img
                  src={item.url}
                  key={index}
                  alt="Thumbnail img"
                  className="cursor-pointer w-24"
                  onClick={() => setImage(item)}
                />
              ))}
            </div>

            {/* Main Img */}
            <div>
              <img
                src={image}
                alt="Main img"
                className="w-full md:w-md h-full md:h-auto"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium">{productData?.name}</h1>

              {/* Ratings */}
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <img src={assets.star_icon} alt="star-icon" className="w-3" />
                  <img src={assets.star_icon} alt="star-icon" className="w-3" />
                  <img src={assets.star_icon} alt="star-icon" className="w-3" />
                  <img src={assets.star_icon} alt="star-icon" className="w-3" />
                  <img
                    src={assets.star_dull_icon}
                    alt="star-icon"
                    className="w-3 5"
                  />
                </div>

                <p>(122)</p>
              </div>
            </div>

            {/* Price */}
            <p className="text-3xl font-medium">
              {currency} {productData?.price}
            </p>

            {/* Description */}
            <p className="text-gray-500 w-full md:w-4/5">{productData?.description}</p>

            {/* Size */}
            <div className="flex flex-col gap-4">
              <p>Select size</p>

              <div className="flex gap-3">
                {productData?.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`border border-gray-200 bg-gray-100 px-4 py-2 cursor-pointer ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div>
              <button
                className="px-8 py-4 text-sm bg-black text-white active:bg-gray-700 cursor-pointer"
                onClick={() => {
                  if (user) {
                    handleAddToCart();
                  } else {
                    toast.error("Sorry....Login first 🔑");
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>

            <hr className=" text-gray-200 w-4/5" />

            <div className="flex flex-col gap-1 text-sm text-gray-500">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      )}

      {/*Description and Reviews*/}
      <div className="">
        <div className="flex text-sm">
          <p className="border border-gray-200 py-3 px-5 font-semibold">
            Description
          </p>
          <p className="border border-gray-200 py-3 px-5">Reviews (122)</p>
        </div>

        <div className="flex flex-col p-6 text-sm text-gray-500 gap-4 border border-gray-200">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>

          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData?.category}
        subCategory={productData?.subCategory}
      />
    </div>
  );
};

export default Product;

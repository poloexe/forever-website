import { useState } from "react";
import { assets } from "../assets/assets";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddItems = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestSeller: false,
    sizes: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizesChange = (selectedSize) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(selectedSize)
        ? prev.sizes.filter((size) => size !== selectedSize)
        : [...prev.sizes, selectedSize],
    }));
  };

  const {
    mutate: submitForm,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) => {
      const formDataToSend = new FormData();

      formDataToSend.append("name", data.name);
      formDataToSend.append("description", data.description);
      formDataToSend.append("price", data.price);
      formDataToSend.append("category", data.category);
      formDataToSend.append("subCategory", data.subCategory);
      formDataToSend.append("bestSeller", data.bestSeller);
      formDataToSend.append("sizes", JSON.stringify(data.sizes));

      image1 && formDataToSend.append("image1", image1);
      image2 && formDataToSend.append("image2", image2);
      image3 && formDataToSend.append("image3", image3);
      image4 && formDataToSend.append("image4", image4);

      const res = await fetch("http://localhost:8000/api/product/add", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Product Added");

      // setFormData({
      //   name: "",
      //   description: "",
      //   price: "",
      //   category: "Men",
      //   subCategory: "Topwear",
      //   bestSeller: false,
      //   sizes: [],
      // });

      // setImage1(false);
      // setImage2(false);
      // setImage3(false);
      // setImage4(false);
    },
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    submitForm({ ...formData, image1, image2, image3, image4 });
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col gap-4 w-full my-8 ml-20"
    >
      <div>
        <p className="mb-2 text-gray-600">Upload Image</p>

        <div className="flex gap-2">
          {/* Image 1 */}
          <label htmlFor="image1" className="w-20 cursor-pointer">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />

            <input
              type="file"
              id="image1"
              onChange={(e) => setImage1(e.target.files[0])}
              accept="image/*"
              hidden
            />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2" className="w-20 cursor-pointer">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />

            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
              accept="image/*"
            />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3" className="w-20 cursor-pointer">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />

            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
              accept="image/*"
            />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4" className="w-20 cursor-pointer">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />

            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* Name */}
      <div>
        <p className="mb-2 text-gray-600">Product Name</p>
        <input
          name="name"
          value={formData.name}
          type="text"
          placeholder="Type Here"
          className="w-[500px] px-3 py-2 border border-gray-400 rounded-md"
          onChange={handleInputChange}
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-2 text-gray-600">Product Description</p>
        <textarea
          name="description"
          placeholder="Write content here"
          className="w-[500px] px-3 py-2 border border-gray-400 rounded-md"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* Categories and price */}
      <div className="flex gap-4 text-gray-600">
        {/* Product category */}
        <div className="flex flex-col gap-2">
          <p>Product category</p>
          <select
            className="border-2 border-gray-400 rounded-lg py-2 px-2 text-sm"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Sub category */}
        <div className="flex flex-col gap-2">
          <p>Product Sub Category</p>
          <select
            className="border-2 border-gray-400 rounded-lg py-2 px-2 text-sm"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <p>Product Price</p>
          <input
            name="price"
            type="number"
            className="w-[120px] border-2 border-gray-400 rounded-lg py-2 px-2 text-sm"
            placeholder="50000"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col">
        <p className="text-gray-600 mb-2">Product Sizes</p>
        <div className="flex gap-3 text-gray-600">
          {["S", "M", "L", "XL", "XXL"].map((s, index) => (
            <button
              className={`cursor-pointer py-1 px-3 ${
                formData.sizes.includes(s) ? "bg-pink-100" : "bg-slate-100"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleSizesChange(s);
              }}
              key={index}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Best seller */}
      <div className="mt-4 flex gap-2">
        <input
          type="checkbox"
          onChange={() =>
            setFormData((prev) => ({ ...prev, bestSeller: !prev.bestSeller }))
          }
          name="bestSeller"
          checked={formData.bestSeller}
        />
        <p className="text-gray-600">Add to Bestseller</p>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {isError ? <p className="text-red-500">{error.message}</p> : ""}
        <button
          type="submit"
          className={`py-3 w-32 text-white bg-black ${
            isPending ? "opacity-5 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isPending}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddItems;

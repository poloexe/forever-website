import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { currency } from "../App";

const Lists = () => {
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/product/all"
      );
      const resData = await res.json();

      if (!res.ok) throw new Error(resData.message || "Something went wrong");

      return resData.products;
    },
  });

  // Remove products
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      const res = await fetch(
        `http://localhost:8000/api/product/remove/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Product Deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-col ml-20 mt-6 gap-4">
      <h1>All Products Lists</h1>

      <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-100 py-1 px-2 text-sm text-gray-600 font-semibold border border-gray-200">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-200 py-1 px-2 text-sm text-gray-600 font-semibold"
          >
            <img src={product.image[0].url} alt="" className="w-12" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency} {product.price}
            </p>
            <p
              className="font-bold cursor-pointer text-center hover:text-gray-500"
              onClick={(e) => {
                e.preventDefault();
                deleteProduct(product._id);
              }}
            >
              X
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center my-12">
          <p>No Products Found ❌</p>
        </div>
      )}
    </div>
  );
};

export default Lists;

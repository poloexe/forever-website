import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const currency = "₦";
  const deliveryFee = 2000;
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: async ({ itemId, size }) => {
      try {
        const res = await fetch(
          "https://forever-website-1mf9.onrender.com/api/cart/add",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId, size }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to add to cart");

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userCart"]);
    },
  });

  const { data: userCart } = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://forever-website-1mf9.onrender.com/api/cart/fetchcart",

          {
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Something went wrong");

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    retry: false,
  });

  const { data: products = [] } = useQuery({
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

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://forever-website-1mf9.onrender.com/api/auth/getme",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.msg || "Something went wrong");

        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });

  const addToCart = (productId, size) => {
    const cartCopy = structuredClone(cart);

    if (cartCopy[productId]) {
      if (cartCopy[productId][size]) {
        cartCopy[productId][size] += 1;
      } else {
        cartCopy[productId][size] = 1;
      }
    } else {
      cartCopy[productId] = {};
      cartCopy[productId][size] = 1;
    }

    setCart(cartCopy);

    addToCartMutation({ itemId: productId, size });
  };

  const getCartTotal = () => {
    let totalItems = 0;

    for (let i in cart) {
      const sizes = cart[i];

      for (let i in sizes) {
        totalItems += sizes[i];
      }
    }

    return totalItems;
  };

  const updateQuantity = async (productId, size, quantity) => {
    let cartCopy = structuredClone(cart);

    cartCopy[productId][size] = quantity;

    setCart(cartCopy);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (let items in cart) {
      const itemInfo = products.find((product) => product._id === items);

      for (let item in cart[items]) {
        if (cart[items][item] > 0) {
          if (itemInfo) {
            totalAmount += itemInfo.price * cart[items][item];
          }
        }
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    setUser(authUser || null);
  }, [authUser]);

  useEffect(() => {
    if (userCart && userCart.cartData) {
      setCart(userCart.cartData);
    }
  }, [userCart]);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        cart,
        setCart,
        addToCart,
        getCartTotal,
        updateQuantity,
        getTotalCartAmount,
        navigate,
        user,
        setUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

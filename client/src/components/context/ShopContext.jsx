import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useProducts } from "../../hooks/useProducts";
import { useUserCart } from "../../hooks/useUserCart";
import { useAddToCartMutation } from "../../hooks/useAddToCartMutation";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const currency = "₦";
  const deliveryFee = 2000;
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { data: userCart } = useUserCart();
  const { data: products = [] } = useProducts();
  const { data: authUser, isSuccess } = useAuthUser();
  const { mutate: addToCartMutation } = useAddToCartMutation();

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
    if (isSuccess) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  }, [authUser, isSuccess]);

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

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Collection from "./components/collection/Collection";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Product from "./components/product/Product";
import { ToastContainer, Slide } from "react-toastify";
import Cart from "./components/cart/Cart";
import PlaceOrder from "./components/cart/PlaceOrder";
import Orders from "./components/cart/Orders";
import Auth from "./components/auth/Auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";


const App = () => {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        limit={3}
        hideProgressBar={true}
        transition={Slide}
      />

      <div className="px-5 lg:px-[8rem] min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

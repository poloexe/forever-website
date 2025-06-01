import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Lists from "./pages/Lists";
import AddItems from "./pages/AddItems";
import Orders from "./pages/Orders";
import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer, Slide } from "react-toastify";

export const currency = "₦";


function ProtectedLayout() {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ToastContainer
        autoClose={1000}
        limit={3}
        hideProgressBar={true}
        transition={Slide}
      />

      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/add" element={<AddItems />} />
          <Route path="/admin/lists" element={<Lists />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

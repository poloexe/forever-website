import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderSpinner } from "../components/LoaderSpinner";
import { useAdminUser } from "../hooks/useAdminUser";
import { useAdminLogin } from "../hooks/useAdminLogin";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { data: admin, isLoading, isFetching, isSuccess } = useAdminUser();

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const {
    mutate: login,
    isPending,
    isError: isLoginError,
    error: loginError,
  } = useAdminLogin({ email: formData.email, password: formData.password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isLoading || isFetching) return <LoaderSpinner />;
  if (isSuccess && admin) return <Navigate to="/add" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center w-96"
      >
        {/* Title */}
        <h1 className="flex items-center md:flex-row gap-2 text-3xl">
          <span className="font-medium text-black prata">Admin Login</span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-4 w-full">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border px-3 py-2"
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border px-3 py-2"
            required
            value={formData.password}
            onChange={handleInputChange}
          />

          {isLoginError ? (
            <p className="text-red-500 text-center shake-x">
              {loginError.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          className={`cursor-pointer bg-black text-white px-10 py-3 mt-4 font-light ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isPending}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

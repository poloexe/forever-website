import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderSpinner } from "../components/LoaderSpinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/getadmin",
        { credentials: "include" }
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Login Success!");
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
      navigate("/admin/add");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isLoading) return <LoaderSpinner />;
  if (data) return <Navigate to="/admin/add" replace />;

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

          {isError ? (
            <p className="text-red-500 text-center shake-x">{error.message}</p>
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

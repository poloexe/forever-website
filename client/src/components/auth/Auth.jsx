import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    mutate: login,
    isError: isLoginError,
    error: loginError,
    isPending: isloggingIn,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login Successful 😊");
      navigate("/");
    },
  });

  const {
    mutate: register,
    isError: isRegisterError,
    error: registerError,
    isPending: isRegistering,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Registered Successfully 👌");
      setCurrentState("Login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      login({ email: formData.email, password: formData.password });
    }
    if (currentState === "Sign Up") {
      register(formData);
    }
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center max-w-96 m-auto mt-20"
      >
        {/* Title */}
        <h1 className="flex items-center md:flex-row gap-2 text-4xl">
          <span className="font-medium text-black latest-arrival">
            {currentState}
          </span>
          <span className="h-0.5 w-14 bg-gray-700"></span>
        </h1>
        {/* Form */}
        <div className="flex flex-col gap-4 w-full">
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              placeholder="Full Name"
              className="border px-3 py-2"
              onChange={handleInputChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="border px-3 py-2"
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="border px-3 py-2"
            onChange={handleInputChange}
            required
          />

          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="border px-3 py-2"
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <div className="flex justify-between w-full text-sm">
          <p className="cursor-pointer hover:opacity-50">Forgot password ?</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer hover:opacity-50"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create Account?
            </p>
          ) : (
            <p
              className="cursor-pointer hover:opacity-50"
              onClick={() => setCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>

        {currentState === "Login" && isLoginError && (
          <p className="text-red-500 text-center shake-x">
            {loginError.message}
          </p>
        )}
        {currentState === "Sign Up" && isRegisterError && (
          <p className="text-red-500 text-center shake-x">
            {registerError.message}
          </p>
        )}

        <button
          className={`bg-black text-white px-10 py-3 mt-4 font-light  ${
            (currentState === "Login" && isloggingIn) ||
            (currentState === "Sign Up" && isRegistering)
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          type="submit"
          disabled={
            (currentState === "Login" && isloggingIn) ||
            (currentState === "Sign Up" && isRegistering)
          }
        >
          {currentState === "Login" ? "Sign In" : "Sign up"}
        </button>
      </form>
    </>
  );
};

export default Auth;

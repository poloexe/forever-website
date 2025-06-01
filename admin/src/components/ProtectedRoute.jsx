import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://forever-website-1mf9.onrender.com/api/auth/getadmin",
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
  });

  if (isLoading || isFetching) return <LoaderSpinner />;
  if (isError || !data) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;

import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import LoaderSpinner from "../Loading/LoaderSpinner";

export const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError, isFetching } = useQuery({
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
        console.log(error.message);
        throw error;
      }
    },
  });

  if (isLoading || isFetching) return <LoaderSpinner />;
  if (isError || !data) return <Navigate to="/auth" replace />;
  return children;
};

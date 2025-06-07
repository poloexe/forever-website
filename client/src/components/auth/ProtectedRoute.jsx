import { Navigate } from "react-router-dom";
import { LoaderSpinner } from "../Loading/LoaderSpinner";
import { useAuthUser } from "../../hooks/useAuthUser";

export const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError, isFetching } = useAuthUser();

  if (isLoading || isFetching) return <LoaderSpinner />;
  if (isError || !data) return <Navigate to="/auth" replace />;
  return children;
};

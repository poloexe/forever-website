import { Navigate } from "react-router-dom";
import { LoaderSpinner } from "./LoaderSpinner";
import { useAdminUser } from "../hooks/useAdminUser";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError, isFetching } = useAdminUser();

  if (isLoading || isFetching) return <LoaderSpinner />;
  if (isError || !data) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

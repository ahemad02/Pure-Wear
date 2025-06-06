import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/Auth.jsx";

export const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/account/login" />;

  return children;
};

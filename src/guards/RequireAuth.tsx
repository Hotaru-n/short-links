import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface RequireAuthProps {
  children: ReactNode;
}

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

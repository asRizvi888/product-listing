import React from "react";
import { Navigate } from "react-router-dom";

const router = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> => {
  const WithAuth: React.FC<T> = (props) => {
    const isAuthenticated = localStorage.getItem("ACCESS_TOKEN");
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    if (isAuthenticated && window.location.pathname === "/") {
      return <Navigate to="/product" replace />;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default router;

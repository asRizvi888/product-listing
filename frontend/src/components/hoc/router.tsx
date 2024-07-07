import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const router = <T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> => {
  const WithAuth: React.FC<T> = (props) => {
    const isAuthenticated = localStorage.getItem("ACCESS_TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
      if (isAuthenticated && window.location.pathname === "/") {
        navigate("/product");
      }
    }, [isAuthenticated]);
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default router;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader-premium"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: ("ADMIN" | "USER")[];
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user, isLoading } = useAuth();
  // session verification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }
  //  Not logged in 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Unauthorized role 
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized 
  return <Outlet />;
};

// src/features/auth/RequireAuth.tsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import { selectIsAuthenticated } from "@/store/auth/authSelectors";

const RequireAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  // Dodajmo console.log za debugging
  console.log("RequireAuth check, isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

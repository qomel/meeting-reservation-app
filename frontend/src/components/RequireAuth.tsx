import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
  allowedRoles?: string[]; // np. ['admin']
}

export default function RequireAuth({ allowedRoles }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

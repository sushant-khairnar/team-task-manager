import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user?.role === "Admin"
    ? children
    : <Navigate to="/dashboard" />;
}

export default AdminRoute;
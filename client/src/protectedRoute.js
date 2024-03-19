import Cookies from "js-cookie";
import { Navigate } from "react-router";

export default function ProtectedRoutes({ children }) {
  const token = Cookies.get("Authorization");
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

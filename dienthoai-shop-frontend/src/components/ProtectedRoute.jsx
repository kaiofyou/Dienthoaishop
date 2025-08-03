import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về trang /login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung của trang con
  return <Outlet />;
}

export default ProtectedRoute;

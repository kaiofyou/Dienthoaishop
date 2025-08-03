import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute() {
  const { user } = useContext(AuthContext);

  // Kiểm tra xem người dùng có tồn tại và có vai trò là 'ROLE_ADMIN' không
  if (!user || user.role !== "ROLE_ADMIN") {
    // Nếu không phải admin, chuyển hướng về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu là admin, cho phép truy cập
  return <Outlet />;
}

export default AdminRoute;

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        {/* Phần menu chính */}
        <div>
          <h3 className={styles.sidebarTitle}>Admin Panel</h3>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
          >
            Quản lý Sản phẩm
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
          >
            Quản lý Đơn hàng
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeNavLink}`
                : styles.navLink
            }
          >
            Quản lý Danh mục
          </NavLink>
        </div>

        {/* Phần thông tin người dùng và nút Đăng xuất */}
        <div className={styles.userInfoContainer}>
          {user && <p className={styles.userInfo}>Đăng nhập với: {user.sub}</p>}
          <button onClick={handleLogout} className={styles.logoutButton}>
            Đăng Xuất
          </button>
        </div>
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

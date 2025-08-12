import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* Cụm link bên trái */}
      <div className={styles.navGroup}>
        <Link to="/" className={styles.navLink}>
          Trang Chủ
        </Link>
        <Link to="/products" className={styles.navLink}>
          Sản Phẩm
        </Link>
        {user && (
          <Link to="/my-orders" className={styles.navLink}>
            Đơn Hàng
          </Link>
        )}
        {user && user.role === "ROLE_ADMIN" && (
          <Link to="/admin" className={styles.navLink}>
            Quản trị
          </Link>
        )}
      </div>

      {/* Cụm link bên phải */}
      <div className={styles.navGroup}>
        {user && (
          <>
            {/* Đảm bảo link này trỏ đến /cart */}
            <Link to="/cart" className={styles.navLink}>
              Giỏ hàng ({cartItemCount})
            </Link>
          </>
        )}

        {user ? (
          <>
            <span className={styles.userInfo}>Chào, {user.sub}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Đăng Xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Đăng Nhập
            </Link>
            <Link to="/register" className={styles.navLink}>
              Đăng Ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

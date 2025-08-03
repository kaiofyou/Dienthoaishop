import { createContext, useState, useEffect, useContext } from "react"; // Thêm useContext
import { jwtDecode } from "jwt-decode";
import { CartContext } from "./CartContext"; // Import CartContext

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { clearCart } = useContext(CartContext); // Lấy hàm clearCart từ CartContext

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({ sub: decodedUser.sub, role: decodedUser.role });
      } catch (error) {
        console.error("Token không hợp lệ", error);
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    clearCart(); // <-- GỌI HÀM XÓA GIỎ HÀNG Ở ĐÂY
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

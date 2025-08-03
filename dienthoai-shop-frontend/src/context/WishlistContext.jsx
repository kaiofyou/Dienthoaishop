import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);

  const fetchWishlist = () => {
    if (!token) return;
    setLoading(true);
    axios
      .get("http://localhost:8080/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách yêu thích!", error);
      })
      .finally(() => setLoading(false));
  };

  // Tải danh sách yêu thích khi người dùng đăng nhập
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]); // Xóa danh sách khi đăng xuất
    }
  }, [user, token]);

  const addToWishlist = (productId) => {
    axios
      .post(
        "http://localhost:8080/api/wishlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Đã thêm vào danh sách yêu thích");
        fetchWishlist(); // Tải lại danh sách
      })
      .catch((error) => {
        alert(error.response?.data || "Sản phẩm đã có trong danh sách");
      });
  };

  const removeFromWishlist = (productId) => {
    axios
      .delete(`http://localhost:8080/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Đã xóa khỏi danh sách yêu thích");
        fetchWishlist(); // Tải lại danh sách
      })
      .catch((error) => {
        alert("Không thể xóa sản phẩm.");
      });
  };

  // Hàm để kiểm tra xem một sản phẩm có trong danh sách yêu thích không
  const isItemInWishlist = (productId) => {
    return wishlistItems.some((item) => item.product.id === productId);
  };

  const wishlistContextValue = {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
  };

  return (
    <WishlistContext.Provider value={wishlistContextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

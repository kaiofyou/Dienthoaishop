import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import styles from "./HomePage.module.css";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Tải trang đầu tiên của sản phẩm và chỉ lấy 4 sản phẩm làm sản phẩm nổi bật
    axios
      .get("http://localhost:8080/api/products?page=0&size=4") // Lấy 4 sản phẩm
      .then((response) => {
        // --- SỬA LỖI Ở ĐÂY: Đọc dữ liệu từ response.data.content ---
        setFeaturedProducts(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm nổi bật!", error);
      });
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Thế giới công nghệ trong tay bạn</h1>
        <p className={styles.heroSubtitle}>
          Khám phá những mẫu điện thoại mới nhất với công nghệ đỉnh cao và ưu
          đãi hấp dẫn.
        </p>
        <Link to="/products" className={styles.heroButton}>
          Xem tất cả sản phẩm
        </Link>
      </div>

      {/* Featured Products Section */}
      <div className={styles.featuredSection}>
        <h2 className={styles.featuredTitle}>Sản phẩm nổi bật</h2>
        <div className={styles.featuredGrid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

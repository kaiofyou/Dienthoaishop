import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import styles from "./ProductDetailPage.module.css";
import Reviews from "../components/Reviews"; // <-- Import component mới

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết sản phẩm!", err);
        setError("Không tìm thấy sản phẩm.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className={styles.loading}>Đang tải...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.detailLayout}>
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>
            {product.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}>
            <strong>Tồn kho:</strong> {product.stock}
          </p>
          <button
            onClick={() => addToCart(product)}
            className={styles.addToCartButton}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* --- THÊM PHẦN ĐÁNH GIÁ Ở ĐÂY --- */}
      <Reviews productId={id} />
    </div>
  );
}

export default ProductDetailPage;

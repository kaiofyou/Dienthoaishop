import { Link } from "react-router-dom";
import { useContext } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>
          {product.price.toLocaleString("vi-VN")} VNĐ
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;

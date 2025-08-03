import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isItemInWishlist } =
    useContext(WishlistContext);

  const inWishlist = isItemInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Ngăn không cho điều hướng khi nhấn nút yêu thích
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <button onClick={handleWishlistClick} className={styles.wishlistButton}>
        {inWishlist ? "♥" : "♡"}
      </button>
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

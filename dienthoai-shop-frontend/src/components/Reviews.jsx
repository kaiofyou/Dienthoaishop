import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styles from "./Reviews.module.css";

// Component để hiển thị các ngôi sao
const StarRating = ({ rating, onRate, size = 25 }) => {
  return (
    <div className={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate && onRate(star)}
          style={{ fontSize: size, cursor: onRate ? "pointer" : "default" }}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user, token } = useContext(AuthContext);

  const fetchReviews = () => {
    axios
      .get(`http://localhost:8080/api/reviews/product/${productId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Lỗi khi tải đánh giá!", err));
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá.");
      return;
    }

    const reviewData = { productId, rating, comment };

    axios
      .post("http://localhost:8080/api/reviews", reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Cảm ơn bạn đã đánh giá!");
        setRating(0);
        setComment("");
        fetchReviews(); // Tải lại danh sách đánh giá
      })
      .catch((err) => {
        console.error("Lỗi khi gửi đánh giá!", err);
        alert(err.response?.data || "Đã có lỗi xảy ra.");
      });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Đánh giá sản phẩm</h3>

      {user && (
        <form onSubmit={handleSubmitReview} className={styles.formContainer}>
          <h4>Viết đánh giá của bạn</h4>
          <div className={styles.formGroup}>
            <label>Xếp hạng:</label>
            <StarRating rating={rating} onRate={setRating} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="comment">Bình luận:</label>
            <textarea
              id="comment"
              className={styles.textarea}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Gửi đánh giá
          </button>
        </form>
      )}

      <div className={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewUser}>
                  {review.user.username}
                </span>
                <StarRating rating={review.rating} size={18} />
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
              <span className={styles.reviewDate}>
                {new Date(review.reviewDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;

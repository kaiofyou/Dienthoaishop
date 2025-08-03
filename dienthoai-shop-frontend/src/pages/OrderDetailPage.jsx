import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styles from "./OrderDetailPage.module.css";

function OrderDetailPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrder(response.data);
        })
        .catch((err) => {
          console.error("Lỗi khi tải chi tiết đơn hàng!", err);
          setError(err.response?.data || "Không thể tải thông tin đơn hàng.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, token]);

  if (loading) return <p className={styles.loading}>Đang tải...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!order) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chi tiết Đơn hàng #{order.id}</h2>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <p>Ngày đặt:</p>
          <span>{new Date(order.orderDate).toLocaleString("vi-VN")}</span>
        </div>
        <div className={styles.summaryItem}>
          <p>Trạng thái:</p>
          <span>{order.status}</span>
        </div>
        <div className={styles.summaryItem}>
          <p>Tổng cộng:</p>
          <span>{order.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
        </div>
      </div>

      <h3 className={styles.itemsTitle}>Các sản phẩm đã mua</h3>
      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá tại thời điểm mua</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.priceAtPurchase.toLocaleString("vi-VN")} VNĐ</td>
              <td>
                {(item.quantity * item.priceAtPurchase).toLocaleString("vi-VN")}{" "}
                VNĐ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailPage;

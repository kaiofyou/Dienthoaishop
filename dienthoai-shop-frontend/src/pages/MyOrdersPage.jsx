import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./MyOrdersPage.module.css"; // Import CSS Module

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi tải lịch sử đơn hàng!", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  if (loading)
    return <p className={styles.loading}>Đang tải lịch sử đơn hàng...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p className={styles.emptyOrders}>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={styles.tableRow}
                onClick={() => navigate(`/my-orders/${order.id}`)}
              >
                <td>#{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString("vi-VN")}</td>
                <td>{order.totalPrice.toLocaleString("vi-VN")} VNĐ</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyOrdersPage;

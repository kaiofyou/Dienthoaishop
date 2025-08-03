import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminOrderPage.module.css";

function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchOrders = () => {
    if (token) {
      axios
        .get("http://localhost:8080/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Lỗi khi tải đơn hàng!", err));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(
        `http://localhost:8080/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? response.data : order
          )
        );
        alert("Cập nhật trạng thái thành công!");
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật trạng thái!", err);
        alert("Đã có lỗi xảy ra.");
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý Đơn hàng</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Mã ĐH</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user.username}</td>
              <td>{new Date(order.orderDate).toLocaleString("vi-VN")}</td>
              <td>{order.totalPrice.toLocaleString("vi-VN")} VNĐ</td>
              <td>
                <select
                  className={`${styles.statusSelect} ${
                    styles["status_" + order.status]
                  }`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="PENDING">Đang xử lý</option>
                  <option value="PROCESSING">Đang giao</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderPage;

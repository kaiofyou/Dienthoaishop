import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import styles from "./CartPage.module.css";

function CartPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Mặc định là COD

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    // Tạo đối tượng request mới
    const orderRequest = {
      items: orderItems,
      paymentMethod: paymentMethod,
    };

    axios
      .post("http://localhost:8080/api/orders", orderRequest, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Đặt hàng thành công!");
        clearCart();
        navigate("/my-orders");
      })
      .catch((error) => {
        console.error("Lỗi khi đặt hàng!", error);
        alert(error.response?.data || "Đã có lỗi xảy ra.");
      });
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyCart}>Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Giỏ hàng của bạn</h2>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toLocaleString("vi-VN")} VNĐ</td>
              <td>
                {(item.quantity * item.price).toLocaleString("vi-VN")} VNĐ
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- PHẦN CHỌN PHƯƠNG THỨC THANH TOÁN --- */}
      <div className={styles.paymentSection}>
        <h3 className={styles.paymentTitle}>Chọn phương thức thanh toán</h3>
        <div
          className={`${styles.paymentOption} ${
            paymentMethod === "COD" ? styles.paymentOptionSelected : ""
          }`}
          onClick={() => setPaymentMethod("COD")}
        >
          <div
            className={`${styles.radioCircle} ${
              paymentMethod === "COD" ? styles.radioCircleSelected : ""
            }`}
          >
            {paymentMethod === "COD" && (
              <div className={styles.radioInnerCircle} />
            )}
          </div>
          <p>Thanh toán khi nhận hàng (COD)</p>
        </div>
        <div
          className={`${styles.paymentOption} ${
            paymentMethod === "QR_CODE" ? styles.paymentOptionSelected : ""
          }`}
          onClick={() => setPaymentMethod("QR_CODE")}
        >
          <div
            className={`${styles.radioCircle} ${
              paymentMethod === "QR_CODE" ? styles.radioCircleSelected : ""
            }`}
          >
            {paymentMethod === "QR_CODE" && (
              <div className={styles.radioInnerCircle} />
            )}
          </div>
          <p>Thanh toán bằng mã QR</p>
        </div>
      </div>

      {/* Hiển thị mã QR nếu được chọn */}
      {paymentMethod === "QR_CODE" && (
        <div className={styles.qrContainer}>
          <p>Quét mã QR sau để thanh toán:</p>
          <img
            src="https://api.vietqr.io/image/970436-113366668888-O30soS2.jpg?accountName=TRAN%20VAN%20A&amount=100000&addInfo=DH123"
            alt="Mã QR thanh toán"
            className={styles.qrImage}
          />
        </div>
      )}

      <div className={styles.summary}>
        <h3 className={styles.totalPrice}>
          Tổng cộng: {totalPrice.toLocaleString("vi-VN")} VNĐ
        </h3>
        <button onClick={handleCheckout} className={styles.checkoutButton}>
          {paymentMethod === "COD" ? "Xác nhận đặt hàng" : "Tôi đã thanh toán"}
        </button>
      </div>
    </div>
  );
}

export default CartPage;

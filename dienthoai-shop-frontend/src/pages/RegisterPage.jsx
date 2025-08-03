import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css"; // Import CSS Module

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Lỗi khi đăng ký!", err);
        setError(err.response?.data || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Đăng Ký Tài Khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.formInput}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formInput}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Họ và Tên:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={styles.formInput}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Đăng Ký
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

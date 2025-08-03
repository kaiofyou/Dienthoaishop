import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:8080/api/auth/login", formData)
      .then((response) => {
        const token = response.data;
        login(token);
        navigate("/");
      })
      .catch((err) => {
        console.error("Lỗi khi đăng nhập!", err);
        setError("Tên đăng nhập hoặc mật khẩu không đúng.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Đăng Nhập</h2>
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
          <div className={styles.extraActions}>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit" className={styles.submitButton}>
            Đăng Nhập
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        {/* --- THÊM PHẦN NÀY VÀO --- */}
        <div className={styles.registerLink}>
          <span>Chưa có tài khoản? </span>
          <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

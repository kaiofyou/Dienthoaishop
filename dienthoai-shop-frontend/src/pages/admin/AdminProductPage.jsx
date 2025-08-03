import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./AdminProductPage.module.css";

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchProducts = () => {
    // Lấy trang đầu tiên và một số lượng lớn sản phẩm để hiển thị
    axios
      .get("http://localhost:8080/api/products?page=0&size=100")
      .then((response) => {
        // --- SỬA LỖI Ở ĐÂY: Đọc dữ liệu từ response.data.content ---
        setProducts(response.data.content);
      })
      .catch((error) => console.error("Lỗi khi tải sản phẩm!", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .delete(`http://localhost:8080/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Xóa sản phẩm thành công!");
          fetchProducts();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm!", error);
          alert("Đã có lỗi xảy ra khi xóa sản phẩm.");
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Quản lý Sản phẩm</h2>
        <Link to="/admin/products/add" className={styles.addButton}>
          Thêm sản phẩm mới
        </Link>
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString("vi-VN")} VNĐ</td>
              <td>{product.stock}</td>
              <td className={styles.actionButtons}>
                <Link to={`/admin/products/edit/${product.id}`}>
                  <button className={styles.editButton}>Sửa</button>
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className={styles.deleteButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductPage;

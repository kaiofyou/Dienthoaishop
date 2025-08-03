import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminCategoryPage.module.css";

function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const { token } = useContext(AuthContext);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi khi tải danh mục!", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const categoryData = { name: currentName };
    const request = editingCategory
      ? axios.put(
          `http://localhost:8080/api/categories/${editingCategory.id}`,
          categoryData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      : axios.post("http://localhost:8080/api/categories", categoryData, {
          headers: { Authorization: `Bearer ${token}` },
        });

    request
      .then(() => {
        fetchCategories();
        cancelEdit();
      })
      .catch((err) => {
        console.error("Lỗi khi lưu danh mục!", err);
        alert("Đã có lỗi xảy ra.");
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa danh mục này? Thao tác này có thể thất bại nếu danh mục còn chứa sản phẩm."
      )
    ) {
      axios
        .delete(`http://localhost:8080/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => fetchCategories())
        .catch((err) => {
          console.error("Lỗi khi xóa danh mục!", err);
          alert(
            "Không thể xóa danh mục. Vui lòng đảm bảo không còn sản phẩm nào thuộc danh mục này."
          );
        });
    }
  };

  const startEdit = (category) => {
    setEditingCategory(category);
    setCurrentName(category.name);
    setIsFormVisible(true);
  };

  const startAdd = () => {
    setEditingCategory(null);
    setCurrentName("");
    setIsFormVisible(true);
  };

  const cancelEdit = () => {
    setIsFormVisible(false);
    setEditingCategory(null);
    setCurrentName("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Quản lý Danh mục</h2>
        {!isFormVisible && (
          <button onClick={startAdd} className={styles.addButton}>
            Thêm danh mục mới
          </button>
        )}
      </div>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <h3>{editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}</h3>
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="Tên danh mục"
              required
            />
            <button type="submit" className={styles.saveButton}>
              Lưu
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className={styles.cancelButton}
            >
              Hủy
            </button>
          </form>
        </div>
      )}

      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td className={styles.actionButtons}>
                <button
                  onClick={() => startEdit(cat)}
                  className={styles.editButton}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
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

export default AdminCategoryPage;

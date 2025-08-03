import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductForm.module.css"; // Import CSS Module

function ProductForm({ initialData = {}, onSubmit }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: { id: "" },
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi tải danh mục!", err));
  }, []);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        imageUrl: initialData.imageUrl || "",
        category: initialData.category || { id: "" },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setProduct((prev) => ({ ...prev, category: { id: value } }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Tên sản phẩm:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Mô tả:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className={styles.formTextarea}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Giá:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="stock">Tồn kho:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="imageUrl">URL Hình ảnh:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="categoryId">Danh mục:</label>
        <select
          id="categoryId"
          name="categoryId"
          value={product.category.id}
          onChange={handleChange}
          className={styles.formSelect}
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Lưu sản phẩm
      </button>
    </form>
  );
}

export default ProductForm;

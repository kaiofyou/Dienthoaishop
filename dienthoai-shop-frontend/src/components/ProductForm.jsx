import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductForm.module.css";

function ProductForm({
  initialData = {},
  onSubmit,
  onFileSelect,
  imagePreviewUrl,
}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discountPrice: "",
    category: { id: "" },
    ...initialData,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi tải danh mục!", err));
  }, []);

  useEffect(() => {
    setProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      discountPrice: "",
      category: { id: "" },
      ...initialData,
    });
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
    onSubmit(product); // Chỉ gửi thông tin sản phẩm, file được xử lý ở component cha
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

      {/* --- PHẦN UPLOAD ẢNH MỚI --- */}
      <div className={styles.formGroup}>
        <label htmlFor="image">Hình ảnh sản phẩm</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={onFileSelect}
          className={styles.fileInput}
        />
        {imagePreviewUrl && (
          <div className={styles.imagePreviewContainer}>
            <img
              src={imagePreviewUrl}
              alt="Xem trước"
              className={styles.imagePreview}
            />
          </div>
        )}
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
        <label htmlFor="price">Giá gốc:</label>
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
        <label htmlFor="discountPrice">
          Giá giảm giá (để trống nếu không có):
        </label>
        <input
          type="number"
          id="discountPrice"
          name="discountPrice"
          value={product.discountPrice}
          onChange={handleChange}
          className={styles.formInput}
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

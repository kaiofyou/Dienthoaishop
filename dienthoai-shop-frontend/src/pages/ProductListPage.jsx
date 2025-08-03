import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import styles from "./ProductListPage.module.css";

const PRODUCTS_PER_PAGE = 8;

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = Tất cả

  // Tải danh sách danh mục khi component render
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Lỗi khi tải danh mục!", error));
  }, []);

  // Tải sản phẩm dựa trên trang và danh mục được chọn
  const fetchProducts = (page, categoryId) => {
    const url = categoryId
      ? `http://localhost:8080/api/products/category/${categoryId}?page=${page}&size=${PRODUCTS_PER_PAGE}`
      : `http://localhost:8080/api/products?page=${page}&size=${PRODUCTS_PER_PAGE}`;

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.number);
        setError(null);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm!", error);
        setError("Không thể tải dữ liệu sản phẩm.");
      });
  };

  // Tải lại sản phẩm khi danh mục được chọn thay đổi
  useEffect(() => {
    fetchProducts(0, selectedCategory);
  }, [selectedCategory]);

  const handlePageChange = (pageNumber) => {
    fetchProducts(pageNumber, selectedCategory);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      fetchProducts(0, selectedCategory); // Tải lại theo danh mục đang chọn
      return;
    }

    axios
      .get(`http://localhost:8080/api/products/search?keyword=${searchTerm}`)
      .then((response) => {
        setProducts(response.data);
        setTotalPages(1);
        setCurrentPage(0);
        setSelectedCategory(null); // Reset bộ lọc khi tìm kiếm
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm!", error);
        setError("Không tìm thấy sản phẩm nào.");
        setProducts([]);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tất cả điện thoại</h2>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Tìm kiếm điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Tìm kiếm
        </button>
      </form>

      {/* Bộ lọc danh mục */}
      <div className={styles.filters}>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`${styles.filterButton} ${
            selectedCategory === null ? styles.activeFilter : ""
          }`}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${styles.filterButton} ${
              selectedCategory === category.id ? styles.activeFilter : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm nào để hiển thị.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ProductListPage;

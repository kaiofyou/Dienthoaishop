import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../../components/admin/ProductForm";
import { AuthContext } from "../../context/AuthContext";

function AdminEditProductPage() {
  const [initialData, setInitialData] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Tải dữ liệu sản phẩm cần sửa
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setInitialData(res.data);
      })
      .catch((err) => console.error("Lỗi khi tải dữ liệu sản phẩm!", err));
  }, [id]);

  const handleUpdateProduct = (productData) => {
    axios
      .put(`http://localhost:8080/api/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Cập nhật sản phẩm thành công!");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm!", error);
        alert("Đã có lỗi xảy ra.");
      });
  };

  if (!initialData) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <ProductForm onSubmit={handleUpdateProduct} initialData={initialData} />
    </div>
  );
}

export default AdminEditProductPage;

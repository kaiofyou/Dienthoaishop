import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../../components/admin/ProductForm";
import { AuthContext } from "../../context/AuthContext";

function AdminAddProductPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddProduct = (productData) => {
    axios
      .post("http://localhost:8080/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Thêm sản phẩm thành công!");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm!", error);
        alert("Đã có lỗi xảy ra.");
      });
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}

export default AdminAddProductPage;

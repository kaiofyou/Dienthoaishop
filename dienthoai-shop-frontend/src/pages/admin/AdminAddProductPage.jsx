import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../../components/admin/ProductForm";
import { AuthContext } from "../../context/AuthContext";

function AdminAddProductPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (productData, file) => {
    if (!file) {
      alert("Vui lòng chọn một hình ảnh cho sản phẩm.");
      return;
    }

    try {
      // 1. Upload ảnh
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:8080/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = uploadRes.data.url;

      // 2. Tạo sản phẩm với URL ảnh đã nhận được
      const finalProductData = { ...productData, imageUrl };

      await axios.post("http://localhost:8080/api/products", finalProductData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm!", error);
      alert("Đã có lỗi xảy ra.");
    }
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm
        onSubmit={handleAddProduct}
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        imagePreviewUrl={previewUrl}
      />
    </div>
  );
}

export default AdminAddProductPage;

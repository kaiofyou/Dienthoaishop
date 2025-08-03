import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductPage from "./pages/admin/AdminProductPage";
import AdminAddProductPage from "./pages/admin/AdminAddProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminOrderPage from "./pages/admin/AdminOrderPage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import "./App.css";

// Component Layout chung cho người dùng
function Layout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main style={{ padding: "1rem", flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Component App chính
function App() {
  return (
    <Routes>
      {/* Route cho người dùng thông thường */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="my-orders/:id" element={<OrderDetailPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Route>

      {/* Route cho khu vực Admin */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="products/add" element={<AdminAddProductPage />} />
          <Route path="products/edit/:id" element={<AdminEditProductPage />} />
          <Route path="orders" element={<AdminOrderPage />} />
          <Route path="categories" element={<AdminCategoryPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

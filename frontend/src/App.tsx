import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { MyOrders } from "./pages/MyOrders";
import { Cart } from "./pages/Cart";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { About } from "./pages/About";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#faf8f5]">
            <Header />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route element={<ProtectedRoute allowedRoles={["USER","ADMIN"]} />}>
                  <Route path="/orders" element={<MyOrders />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
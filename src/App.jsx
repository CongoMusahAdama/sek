import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import "./mobile.css";
import "./Dashboard.css";
import Swal from "sweetalert2";

// Contexts
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SupportBot from "./components/SupportBot";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CollectionsPage from "./pages/CollectionsPage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";

// Utils
import { apiRequest } from "./utils/api";

const App = () => {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Waakye",
    "Fried rice",
    "Plain rice and Nkotomire stew",
    "Angwa mu",
    "Indomie",
    "Jollof rice",
    "Red Red",
  ]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    const ordRes = await apiRequest("/orders");
    if (ordRes.success) setOrders(ordRes.data);
  };

  // Initial Data Fetching
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);

      // Load categories first
      await apiRequest("/categories");
      // Force specific categories part of the brand
      setCategories([
        "Waakye",
        "Fried rice",
        "Plain rice and Nkotomire stew",
        "Angwa mu",
        "Indomie",
        "Jollof rice",
        "Red Red",
      ]);



      const defaultMeals = [
        { _id: 'w1', name: 'Waakye', price: 35, category: 'Waakye', image: '/waakye.png', badge: 'Popular', description: 'Rice and beans served with shito, wele, egg, and plantain.', sizes: ['Standard', 'Medium', 'Double'], extras: [{ name: 'Extra Egg', price: 5 }, { name: 'Extra Wele', price: 10 }, { name: 'Fish', price: 15 }] },
        { _id: 'f1', name: 'Fried rice', price: 40, category: 'Fried rice', image: '/fried rice.png', badge: 'Hot', description: 'Ghanaian style fried rice with spicy chicken.', sizes: ['Standard', 'Full Box'], extras: [{ name: 'Sausage', price: 8 }, { name: 'Fried Egg', price: 5 }, { name: 'Extra Chicken', price: 20 }] },
        { _id: 'n1', name: 'Plain rice and Nkotomire stew', price: 45, category: 'Plain rice and Nkotomire stew', image: '/plain rice and kontomire stew.png', badge: 'Healthy', description: 'Plain rice with delicious spinach and melon seed stew.', sizes: ['Standard'], extras: [{ name: 'Fish', price: 15 }, { name: 'Meat', price: 15 }] },
        { _id: 'a1', name: 'Angwa mu', price: 30, category: 'Angwa mu', image: '/meal_angwa.png', badge: 'Local', description: 'Authentic oiled rice with sardines and hot pepper.', sizes: ['Single', 'Fisherman'], extras: [{ name: 'Sausage', price: 8 }, { name: 'Extra Egg', price: 5 }] },
        { _id: 'i1', name: 'Indomie', price: 25, category: 'Indomie', image: '/indomie.png', badge: 'Fast', description: 'Stir-fried noodles with veggies and fried egg.', sizes: ['Single', 'Double Pack'], extras: [{ name: 'Extra Egg', price: 5 }, { name: 'Extra Veggies', price: 5 }] },
        { _id: 'j1', name: 'Jollof rice', price: 40, category: 'Jollof rice', image: '/meal_jollof.png', badge: 'Classic', description: 'World-famous smoky Ghanaian jollof rice with grilled chicken.', sizes: ['Standard', 'Medium', 'Large'], extras: [{ name: 'Extra Chicken', price: 20 }, { name: 'Salad', price: 5 }] },
        { _id: 'r1', name: 'Red Red', price: 30, category: 'Red Red', image: '/meal_redred.png', badge: 'Local', description: 'Fried plantain with black-eyed beans stew and gari.', sizes: ['Standard'], extras: [{ name: 'Fish', price: 15 }, { name: 'Egg', price: 5 }] }
      ];

      const prodRes = await apiRequest("/products");

      let finalProducts = [];
      if (prodRes.success && prodRes.data?.length > 0) {
        const enrichedApi = prodRes.data.map(p => {
          const normP = normalizeName(p.name);
          const isInvalidImg = !p.image || p.image === '/waakye.png' || p.image.startsWith('blob:');
          
          if (isInvalidImg) {
            let match = defaultMeals.find(m => normalizeName(m.name) === normP || normalizeName(m.category) === normP);
            if (!match) {
              const keywords = ["waakye", "jollof", "indomie", "friedrice", "angwa", "nkotomire", "redred"];
              const foundKey = keywords.find(k => normP.includes(k));
              if (foundKey) {
                match = defaultMeals.find(m => normalizeName(m.name).includes(foundKey) || normalizeName(m.category).includes(foundKey));
              }
            }
            if (match) return { ...p, image: match.image, category: match.category };
          }
          return p;
        });

        const apiNormNames = new Set(enrichedApi.map(p => normalizeName(p.name)));
        const uniqueDefaults = defaultMeals.filter(m => !apiNormNames.has(normalizeName(m.name)));
        finalProducts = [...enrichedApi, ...uniqueDefaults];
      } else {
        finalProducts = defaultMeals;
      }

      const seen = new Set();
      const uniqueList = finalProducts.filter(p => {
        const key = normalizeName(p.name);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setProducts(uniqueList);

      // Verify Auth
      const verifyRes = await apiRequest("/auth/me");
      if (verifyRes.success) {
        setUser(verifyRes.data);
        const ordRes = await apiRequest("/orders");
        if (ordRes.success) setOrders(ordRes.data);
      }

      setLoading(false);
    };
    initApp();
  }, []);

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = (userData) => {
    if (userData.token) {
      localStorage.setItem("sekina_auth_token", userData.token);
    }
    setUser(userData);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to end your session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#A30000",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Sign Out",
    });

    if (result.isConfirmed) {
      await apiRequest("/auth/logout");
      localStorage.removeItem("sekina_auth_token");
      setUser(null);
    }
  };

  const normalizeName = (name) => {
    if (!name) return "";
    return name.toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const addProduct = async (newProduct) => {
    const res = await apiRequest("/products", "POST", newProduct);
    if (res.success) {
      setProducts((prev) => {
        // Remove any existing product with the same name (useful when converting default meals to DB entries)
        const filtered = prev.filter(p => normalizeName(p.name) !== normalizeName(res.data.name));
        return [res.data, ...filtered];
      });
    }
    return res;
  };

  const updateProduct = async (id, updated) => {
    const res = await apiRequest(`/products/${id}`, "PUT", updated);
    if (res.success) {
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    }
    return res;
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--brand-red)",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await apiRequest(`/products/${id}`, "DELETE", null);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
      return res.success;
    }
    return false;
  };

  const addOrder = async (newOrder) => {
    const res = await apiRequest("/orders", "POST", newOrder);
    if (res.success) {
      if (user) {
        setOrders((prev) => [res.data, ...prev]);
        fetchOrders();
      }
      if (res.data.items) {
        res.data.items.forEach((item) => {
          setProducts((prev) =>
            prev.map((p) =>
              p.name === item.name
                ? { ...p, stock: Math.max(0, p.stock - item.qty) }
                : p,
            ),
          );
        });
      }
    }
    return res;
  };

  const updateOrder = async (id, updated) => {
    const res = await apiRequest(`/orders/${id}`, "PUT", updated);
    if (res.success) {
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    }
    return res.success;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader-premium"></div>
      </div>
    );
  }

  return (
    <Router>
      <CartProvider>
        <ModalProvider>
          <div className="app">
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<HomePage products={products} categories={categories} />} />
              <Route path="/shop" element={<ShopPage products={products} categories={categories} />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
              <Route path="/checkout" element={<CheckoutPage addOrder={addOrder} products={products} />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute user={user} loading={loading}>
                    <AdminDashboard
                      products={products}
                      categories={categories}
                      orders={orders}
                      fetchOrders={fetchOrders}
                      addProduct={addProduct}
                      updateProduct={updateProduct}
                      deleteProduct={deleteProduct}
                      addOrder={addOrder}
                      updateOrder={updateOrder}
                      setCategories={setCategories}
                      user={user}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <SupportBot />
            <ProductDetailModal />
            <CartDrawer products={products} />
            <Toast />
          </div>
        </ModalProvider>
      </CartProvider>
    </Router>
  );
};

export default App;

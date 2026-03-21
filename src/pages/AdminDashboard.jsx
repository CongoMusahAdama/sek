import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  LayoutGrid,
  List, 
  Layers, 
  ShoppingCart, 
  Globe, 
  ShoppingBag, 
  LogOut, 
  Menu, 
  User, 
  Plus, 
  Sparkles, 
  AlertTriangle, 
  Edit3, 
  PackageX, 
  Trash, 
  X, 
  Eye, 
  Download, 
  Search, 
  Package, 
  Upload, 
  Award,
  CheckCircle,
  Receipt
} from "lucide-react";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import { apiRequest, API_URL } from "../utils/api";
import { ReceiptCedi } from "../components/Icons";

const AdminDashboard = ({
  products,
  categories,
  orders,
  fetchOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  updateOrder,
  setCategories,
  user,
  onLogout,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleMobileLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to end your session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--brand-red)",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className={`dashboard-layout ${isMinimized ? "minimized" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${isMobileOpen ? "mobile-open" : ""} ${isMinimized ? "minimized" : ""}`}
      >
        <div className="sidebar-header">
          {!isMinimized && (
            <div className="flex items-center gap-4">
              <Link to="/" title="Go to Website">
                <img
                  src="/logo.png"
                  alt="Sekina Special"
                  className="admin-logo"
                  style={{ cursor: "pointer", height: "50px", width: "auto", objectFit: "contain" }}
                />
              </Link>
              <div className="admin-profile-hint">
                <h2
                  className="serif"
                  style={{ fontSize: "1rem", color: "white", margin: 0 }}
                >
                  Sekina Special
                </h2>
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
          )}
          <button
            className="sidebar-minimize-toggle"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <LayoutGrid size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin"
            className={`sidebar-link ${location.pathname === "/admin" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span className="sidebar-text">Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className={`sidebar-link ${location.pathname.startsWith("/admin/products") ? "active" : ""}`}
          >
            <List size={18} />
            <span className="sidebar-text">Menu</span>
          </Link>
          <Link
            to="/admin/categories"
            className={`sidebar-link ${location.pathname.startsWith("/admin/categories") ? "active" : ""}`}
          >
            <Layers size={18} />
            <span className="sidebar-text">Categories</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`sidebar-link ${location.pathname.startsWith("/admin/orders") ? "active" : ""}`}
          >
            <ShoppingCart size={18} />
            <span className="sidebar-text">Orders</span>
          </Link>
          <Link
            to="/admin/receipts"
            className={`sidebar-link ${location.pathname.startsWith("/admin/receipts") ? "active" : ""}`}
          >
            <ReceiptCedi size={18} />
            <span className="sidebar-text">Receipts</span>
          </Link>
          <div
            className="sidebar-divider"
            style={{
              margin: "1rem 0",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          ></div>
          <Link to="/" className="sidebar-link">
            <Globe size={18} />
            <span className="sidebar-text">View Website</span>
          </Link>
          <Link to="/shop" className="sidebar-link">
            <ShoppingBag size={18} />
            <span className="sidebar-text">Go to Shop</span>
          </Link>
          {location.pathname !== "/admin" && (
            <Link to="/admin" className="sidebar-link active" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Back to Dashboard</span>
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={onLogout}
            className="logout-btn"
            style={{ width: "100%", border: "none", background: "none" }}
          >
            <LogOut size={18} />
            <span className="sidebar-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Mobile Nav Toggle */}
        <div className="admin-mobile-nav">
          <div
            className="flex items-center"
            style={{ gap: "0.25rem", marginRight: "0.5rem" }}
          >
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                background: "none",
                border: "none",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--brand-red)",
              }}
            >
              <Menu size={26} />
            </button>
            <Link
              to="/"
              style={{
                color: "var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
              }}
              title="View Website"
            >
              <Globe size={22} />
            </Link>
          </div>
          <h2
            className="serif"
            onClick={() => (window.location.href = "/admin")}
            style={{ cursor: "pointer" }}
          >
            Kitchen Hub
          </h2>
          <div
            className="admin-user-avatar"
            onClick={handleMobileLogout}
            style={{ cursor: "pointer" }}
          >
            <User size={20} />
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <DashboardOverview
                products={products}
                orders={orders}
                user={user}
              />
            }
          />
          <Route
            path="/products"
            element={
              <AdminProducts
                products={products}
                categories={categories}
                deleteProduct={deleteProduct}
                addProduct={addProduct}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <AdminOrders
                orders={orders}
                fetchOrders={fetchOrders}
                addOrder={addOrder}
                updateOrder={updateOrder}
                products={products}
              />
            }
          />
          <Route
            path="/receipts"
            element={
              <AdminReceipts orders={orders} updateOrder={updateOrder} />
            }
          />
          <Route
            path="/categories"
            element={
              <AdminCategories
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          {/* Default to Overview */}
          <Route
            path="*"
            element={
              <DashboardOverview
                products={products}
                orders={orders}
                user={user}
              />
            }
          />
        </Routes>
      </main>

      {/* Admin Bottom Navigation (Mobile) — Pulse-Style */}
      <nav className="admin-bottom-nav">
        {/* Left side: 2 links */}
        <Link
          to="/admin"
          className={`bottom-nav-link ${location.pathname === "/admin" ? "active" : ""}`}
        >
          <LayoutDashboard size={22} />
          <span>Home</span>
        </Link>
        <Link
          to="/admin/products"
          className={`bottom-nav-link ${location.pathname.startsWith("/admin/products") ? "active" : ""}`}
        >
          <Package size={22} />
          <span>Menu</span>
        </Link>

        {/* Center raised FAB button */}
        <div className="bottom-nav-center-slot">
          <Link
            to="/admin/orders"
            className={`bottom-nav-fab ${location.pathname.startsWith("/admin/orders") ? "active" : ""}`}
          >
            <ShoppingCart size={26} />
            <span>Sales</span>
          </Link>
        </div>

        {/* Right side: 2 links */}
        <Link
          to="/admin/receipts"
          className={`bottom-nav-link ${location.pathname.startsWith("/admin/receipts") ? "active" : ""}`}
        >
          <ReceiptCedi size={22} />
          <span>Receipts</span>
        </Link>
      </nav>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const DashboardOverview = ({ products, orders, user }) => {
  const navigate = useNavigate();
  const pendingCount = orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing",
  ).length;
  const lowStockThreshold = 5;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Pagination for Recent Orders
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="dashboard-view fade-in">
      <div className="welcome-banner reveal active">
        <div className="welcome-content">
          <h2 className="serif">
            Welcome Back,{" "}
            {user?.name && user.name !== "Sekina Admin" && user.name !== "Admin"
              ? user.name.split(" ")[0]
              : "Sekina"}
            !
          </h2>
          <p>
            Serving Authentic Ghanaian Flavors. Here is a summary of your
            performance today.
          </p>
        </div>
        <div className="welcome-decor">
          <Sparkles size={60} className="sparkle-icon" />
        </div>
      </div>

      <header className="admin-header">
        <div className="page-title">
          <h1 className="serif">Kitchen Hub Overview</h1>
          <p>
            Sekina Special •{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="header-actions">
          <button
            onClick={() => navigate("/admin/products")}
            className="cta-button-premium shadowed"
            style={{
              padding: "0.8rem 1.75rem",
              fontSize: "0.8rem",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Plus size={18} /> Add New Meal
          </button>
        </div>
      </header>

      {/* Interactive Stats Cards */}
      <div className="stats-grid">
        <div
          className="stat-card blue interactive"
          onClick={() => navigate("/admin/products")}
        >
          <div className="stat-icon">
            <List size={24} />
          </div>
          <div className="stat-info">
            <h3>Menu Items</h3>
            <span className="stat-number">{products.length}</span>
            <span className="stat-link">View menu →</span>
          </div>
        </div>

        <div
          className="stat-card green interactive"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="stat-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <span className="stat-number">{orders.length}</span>
            <span className="stat-link">Manage sales →</span>
          </div>
        </div>

        <div
          className="stat-card yellow interactive"
          onClick={() => navigate("/admin/receipts")}
        >
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <span className="stat-number">
              GH₵{totalSales.toLocaleString()}
            </span>
            <span className="stat-link">Receipts →</span>
          </div>
        </div>

        <div
          className="stat-card orange interactive"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-link">Take action →</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="admin-card">
          <div className="card-header">
            <h2>Recent Orders</h2>
            <Link
              to="/admin/orders"
              style={{ fontSize: "0.8rem", color: "var(--brand-red)", fontWeight: 700 }}
            >
              View All
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id || order.id}>
                    <td data-label="#">{indexOfFirstItem + index + 1}</td>
                    <td data-label="Order ID" style={{ fontWeight: 700 }}>
                      #{order.orderId || order._id}
                    </td>
                    <td data-label="Customer">{order.customer}</td>
                    <td data-label="Total" style={{ fontWeight: 600 }}>
                      GH₵{order.total}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`badge badge-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              className="pagination-wrapper"
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="pagination-btn"
              >
                Prev
              </button>
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminProducts = ({
  products,
  categories,
  deleteProduct,
  addProduct,
  updateProduct,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");

  const filteredProducts = products.filter(p => {
    const searchLow = adminSearch.toLowerCase();
    const nameMatch = p.name?.toLowerCase().includes(searchLow);
    const skuMatch = p.sku?.toLowerCase().includes(searchLow);
    return nameMatch || skuMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const [newProd, setNewProd] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: categories[0] || "Waakye",
    description: "",
    images: [],
    discountPercentage: 0,
    sizes: [],
    extras: []
  });

  const handleEdit = (prod) => {
    setEditingId(prod._id);
    setNewProd({
      name: prod.name || "",
      price: prod.price || "",
      discountPrice: prod.discountPrice || "",
      category: prod.category || (categories[0] || "Waakye"),
      description: prod.description || "",
      images: prod.images || (prod.image ? [prod.image] : []),
      discountPercentage: prod.discountPercentage || 0,
      sizes: prod.sizes || [],
      extras: prod.extras || []
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewProd({
      name: "",
      price: "",
      discountPrice: "",
      category: categories[0] || "Waakye",
      description: "",
      images: [],
      discountPercentage: 0,
      sizes: [],
      extras: []
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));

    const token = localStorage.getItem("sekina_auth_token");

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        credentials: "include",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNewProd((prev) => ({
          ...prev,
          images: [...prev.images, ...data.urls],
        }));
      } else {
        Swal.fire(
          "Media Error",
          data.message || "Image upload failed.",
          "error",
        );
      }
    } catch (err) {
      console.error("Upload Error:", err);
      Swal.fire(
        "Network Error",
        "Image upload failed due to network issue.",
        "error",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = newProd.images.filter((_, i) => i !== index);
    setNewProd({ ...newProd, images: updatedImages });
  };

  const handleSoldOut = async (prod) => {
    const isSoldOut =
      prod.status === "Sold Out" || prod.stock === 0 || !!prod.soldOutAt;

    const result = await Swal.fire({
      title: isSoldOut ? "Restock Product?" : "Mark as Sold Out?",
      text: isSoldOut
        ? "This will make the product active again."
        : "This will mark it as Sold Out and hide it from the shop after 3 days.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--brand-red)",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, proceed",
    });

    if (result.isConfirmed) {
      const prodId = prod._id || prod.id;
      const isMongoId = /^[0-9a-fA-F]{24}$/.test(prodId);
      
      const updateData = isSoldOut 
        ? {
            soldOutAt: null,
            status: "Active",
            stock: Math.max(1, prod.stock || 10),
          }
        : {
            soldOutAt: new Date().toISOString(),
            status: "Sold Out",
            stock: 0,
          };

      let res;
      if (isMongoId) {
        // Existing DB product - use PUT
        res = await updateProduct(prodId, updateData);
      } else {
        // Default product - must CREATE in DB first (POST)
        // We need to send full product data since it doesn't exist in DB yet
        const fullNewData = {
          ...prod,
          ...updateData,
          sku: prod.sku || `LINA-${Math.floor(1000 + Math.random() * 9000)}`
        };
        delete fullNewData._id; // Let Mongo generate a real ID
        delete fullNewData.id;
        res = await addProduct(fullNewData);
      }

      if (res?.success) {
        Swal.fire({
          title: "Updated!",
          text: `Meal is now ${updateData.status === "Active" ? "back in stock" : "sold out"}.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire(
          "Update Failed",
          res?.message || "Could not update product status.",
          "error"
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priceVal = parseFloat(newProd.price) || 0;
    const discPercent = parseFloat(newProd.discountPercentage || 0) || 0;
    const calculatedDiscountPrice =
      discPercent > 0
        ? parseFloat((priceVal * (1 - discPercent / 100)).toFixed(2))
        : null;

    const finalProdData = {
      ...newProd,
      price: priceVal,
      discountPercentage: discPercent,
      discountPrice: calculatedDiscountPrice,
      stock: 999,
      sizes: Array.isArray(newProd.sizes) ? newProd.sizes : [],
      image: newProd.images[0] || "/logo.png",
      sku: editingId ? (products.find(p => p._id === editingId)?.sku || `SS-${Math.floor(Math.random() * 90000 + 10000)}`) : `SS-${Math.floor(Math.random() * 90000 + 10000)}`,
      extras: (newProd.extras || []).filter(extra => extra.name && extra.name.trim() !== "")
    };

    let res = null;
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(editingId);

    if (editingId && isMongoId) {
      res = await updateProduct(editingId, finalProdData);
    } else {
      // If editing a default product (non-Mongo ID), we treat it as adding a new one
      // because it hasn't been saved to the database yet.
      const freshData = { ...finalProdData };
      delete freshData._id;
      delete freshData.id;
      res = await addProduct(freshData);
    }

    const success = res?.success;

    if (!success && res) {
      const errorDetail = res.message || (res.error ? JSON.stringify(res.error) : "The database rejected this meal. Please check all fields.");
      Swal.fire("Publishing Failed", errorDetail, "error");
    }

    if (success) {
      closeModal();
    }
  };

  return (
    <div className="dashboard-view fade-in">
      <header className="admin-header">
        <div className="page-title">
          <h1 className="serif">Product Library</h1>
          <p>Displaying all {products.length} products</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="admin-search-wrap" style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by meal name or SKU..." 
              value={adminSearch}
              onChange={(e) => {
                setAdminSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '0.6rem 1rem 0.6rem 2.2rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '0.85rem',
                width: '240px',
                background: '#f8fafc'
              }}
            />
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setShowModal(true);
            }}
            className="cta-button-premium"
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "0.75rem",
              borderRadius: "12px",
            }}
          >
            <Plus size={16} /> Add Entry
          </button>
        </div>
      </header>

      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-pull-handle"></div>
            <div className="modal-header-premium">
              <div>
                <h2 className="serif">
                  {editingId ? "Edit Meal" : "Add New Meal"}
                </h2>
                <p>
                  {editingId
                    ? "Update the details of this delicious dish."
                    : "Add a new flavor-packed tray to your digital menu."}
                </p>
              </div>
              <button onClick={closeModal} className="sidebar-minimize-toggle">
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="modal-content-scroll">
                <div className="form-grid-2">
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="form-group-premium">
                      <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
                        Meal Identity
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Special Fried Rice with Chicken"
                        value={newProd.name}
                        onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                        style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "1rem" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
                          Price (GH₵)
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="0.00"
                          value={newProd.price}
                          onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                          style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "1rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          value={newProd.discountPercentage}
                          onChange={(e) => setNewProd({ ...newProd, discountPercentage: e.target.value })}
                          style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "1rem" }}
                        />
                      </div>
                    </div>
                    <div className="form-group-premium">
                      <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>
                        Meal Category
                      </label>
                      <select
                        value={newProd.category}
                        onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "1rem" }}
                      >
                        {categories.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group-premium">
                      <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>
                        Meal Story & Details
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Narrate the story..."
                        value={newProd.description}
                        onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "1rem", resize: "none" }}
                      ></textarea>
                    </div>

                    {/* Extras Section */}
                    <div className="form-group-premium" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
                      <div className="flex justify-between items-center" style={{ marginBottom: "1rem" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
                          Customization Options (Extras)
                        </label>
                        <button 
                          type="button" 
                          onClick={() => setNewProd({ ...newProd, extras: [...newProd.extras, { name: "", price: 0 }] })}
                          style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem", borderRadius: "8px", background: "var(--brand-red)", color: "white", border: "none", cursor: "pointer", fontWeight: 700 }}
                        >
                          + Add Extra
                        </button>
                      </div>
                      
                      {newProd.extras.length === 0 && (
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", textAlign: "center", padding: "1rem", border: "1px dashed #e2e8f0", borderRadius: "12px" }}>
                          No add-ons defined for this meal yet.
                        </p>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {newProd.extras.map((extra, idx) => (
                          <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 100px 40px", gap: "0.5rem", alignItems: "center" }}>
                            <input 
                              type="text" 
                              placeholder="Extra Name (e.g. Salad)" 
                              value={extra.name}
                              onChange={(e) => {
                                const updated = [...newProd.extras];
                                updated[idx].name = e.target.value;
                                setNewProd({ ...newProd, extras: updated });
                              }}
                              style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", fontSize: "0.85rem" }}
                            />
                            <input 
                              type="number" 
                              placeholder="Price" 
                              value={extra.price}
                              onChange={(e) => {
                                const updated = [...newProd.extras];
                                updated[idx].price = parseFloat(e.target.value) || 0;
                                setNewProd({ ...newProd, extras: updated });
                              }}
                              style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", fontSize: "0.85rem" }}
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const updated = newProd.extras.filter((_, i) => i !== idx);
                                setNewProd({ ...newProd, extras: updated });
                              }}
                              style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", height: "35px", cursor: "pointer" }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="form-group-premium">
                      <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.9rem", fontWeight: 700, color: "#313e50" }}>
                        Catalogue Imagery
                      </label>
                      <div
                        className="media-upload-area"
                        onClick={() => !isUploading && document.getElementById("image-upload").click()}
                        style={{ opacity: isUploading ? 0.6 : 1, cursor: isUploading ? "wait" : "pointer" }}
                      >
                        <Upload size={32} color="#94a3b8" style={{ marginBottom: "1rem" }} />
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                          {isUploading ? "Uploading to cloud..." : "Click to import high-res media"}
                        </p>
                        <input id="image-upload" type="file" multiple accept="image/*" hidden onChange={handleImageChange} disabled={isUploading} />
                      </div>
                    </div>

                    <div className="admin-images-grid">
                      {newProd.images.map((img, i) => (
                        <div key={i} style={{ position: "relative", height: "80px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                          <img src={img && !img.startsWith("blob:") ? img : "/logo.png"} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <button type="button" onClick={() => removeImage(i)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(239, 68, 68, 0.9)", color: "white", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer-premium">
                <button type="button" onClick={closeModal} style={{ flex: 1, padding: "1.1rem", borderRadius: "16px", fontSize: "1rem", fontWeight: 600, background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <X size={18} /> Cancel
                </button>
                <button type="submit" disabled={isUploading} className="cta-button-premium shadowed" style={{ flex: 2, padding: "1.1rem", borderRadius: "16px", fontSize: "1rem", fontWeight: 800, background: isUploading ? "#94a3b8" : "var(--admin-sidebar-bg)", color: "white", cursor: isUploading ? "wait" : "pointer", opacity: isUploading ? 0.7 : 1 }}>
                  {isUploading ? "Uploading Media..." : editingId ? "Save Changes" : "Finalize & Publish Meal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Meal</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((prod, index) => {
                const imgFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(prod.name || "P")}&background=0d2f2f&color=fff&size=100`;
                return (
                  <tr key={prod._id || prod.id || index}>
                    <td data-label="Meal">
                      <div className="flex items-center">
                        <img src={prod.image && !prod.image.startsWith("blob:") ? prod.image : imgFallback} className="table-product-img" alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", marginRight: "1rem" }} />
                        <div style={{ fontWeight: 700 }}>{prod.name}</div>
                      </div>
                    </td>
                    <td data-label="SKU">
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{prod.sku || 'N/A'}</span>
                    </td>
                    <td data-label="Category">{prod.category}</td>
                    <td data-label="Price" style={{ fontWeight: 600 }}>GH₵{prod.price}</td>
                    <td data-label="Status">
                      {prod.status === "Sold Out" || prod.stock === 0 || !!prod.soldOutAt ? (
                        <span className="badge" style={{ backgroundColor: "#ef4444", color: "#fff", fontSize: "0.75rem", padding: "4px 8px", borderRadius: "4px" }}>Sold Out</span>
                      ) : (
                        <span className="badge badge-paid">Active</span>
                      )}
                    </td>
                    <td data-label="Actions">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(prod)} style={{ padding: "0.4rem", borderRadius: "6px", background: "#f1f5f9" }}><Edit3 size={14} /></button>
                        <button onClick={() => handleSoldOut(prod)} style={{ padding: "0.4rem", borderRadius: "6px", background: "#fef3c7", color: "#d97706" }}><PackageX size={14} /></button>
                        <button onClick={() => deleteProduct(prod._id || prod.id)} style={{ padding: "0.4rem", borderRadius: "6px", background: "#fee2e2", color: "#ef4444" }}><Trash size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination-wrapper" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, products.length)} of {products.length} entries</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="pagination-btn">Previous</button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="pagination-btn">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReceiptModal = ({ order, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const receiptRef = React.useRef(null);

  if (!order) return null;

  const handleDownloadAndShare = async () => {
    setIsGenerating(true);
    const element = receiptRef.current;
    const opt = {
      margin: 10,
      filename: `Receipt_RC-${order.orderId?.split("-")[1]?.toUpperCase() || order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    try {
      await html2pdf().set(opt).from(element).save();
      const itemsList = order.items.map(it => {
        const extrasStr = (it.selectedExtras || []).map(e => `+${e.name}`).join(' ');
        return `• ${it.name} ${it.size ? `(${it.size})` : ""} ${extrasStr ? `[${extrasStr}]` : ""} x${it.qty}`;
      }).join('\n');
      const waText = `Hello ${order.customer}, thank you for your order from Sekina Special!\n\n*Order Details:*\n${itemsList}\n\nWe've attached your digital receipt RC-${order.orderId?.split("-")[1]?.toUpperCase() || order._id} for your records. Enjoy your meal! 😋🍛`;
      const waUrl = `https://wa.me/${order.phone ? order.phone.replace(/[^0-9]/g, "") : ""}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not generate receipt PDF.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose} style={{ zIndex: 1000001 }}>
      <div className="admin-modal-card modal-narrow" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", padding: "0", border: "1px solid #eee" }}>
        <div ref={receiptRef} style={{ background: "#fff", padding: "2rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.08, pointerEvents: "none", zIndex: 0 }}>
            <img src="/logo.png" alt="Watermark" style={{ width: "350px", height: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem", borderBottom: "2px solid #f8fafc", paddingBottom: "1.5rem" }}>
              <h2 className="serif" style={{ color: "var(--brand-red)", fontSize: "1.8rem", margin: "0" }}>Sekina Special</h2>
              <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0" }}>Authentic Ghanaian Flavors</p>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" }}>
                Receipt #: RC-{order.orderId?.split("-")[1]?.toUpperCase() || order._id} | Date: {order.date}
              </div>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "#64748b", fontWeight: 600 }}>Customer</span>
                <span style={{ fontWeight: 700 }}>{order.customer}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "#64748b", fontWeight: 600 }}>Location</span>
                <span style={{ fontWeight: 700 }}>{order.location || "N/A"}</span>
              </div>
            </div>
            <div style={{ background: "rgba(248, 250, 252, 0.8)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem" }}>
              {order.items.map((item, idx) => {
                const extrasTotal = (item.selectedExtras || []).reduce((s, e) => s + (e.price || 0), 0);
                const itemBasePrice = item.price || (order.total / item.qty) - extrasTotal;
                return (
                  <div key={idx} style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                      <span style={{ fontSize: "0.9rem" }}>{item.name} {item.size ? `(${item.size})` : ""}</span>
                      <span>GH₵{((itemBasePrice + extrasTotal) * item.qty).toFixed(2)}</span>
                    </div>
                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        Extras: {item.selectedExtras.map(e => `${e.name} (GH₵${e.price})`).join(', ')}
                      </div>
                    )}
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Unit: GH₵{itemBasePrice.toFixed(2)} | Qty: {item.qty}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--brand-red)", paddingTop: "1.5rem", marginTop: "1rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b" }}>Total Amount</span>
              <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--brand-red)" }}>GH₵{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer-premium" style={{ marginTop: "0", background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "1.5rem" }}>
          <button className="btn-cancel-premium" onClick={onClose} style={{ flex: 1 }}>Close</button>
          <button className="cta-button-premium" style={{ flex: 1 }} onClick={handleDownloadAndShare} disabled={isGenerating}>
            {isGenerating ? "Processing..." : <><Download size={16} /> Save PDF & WA</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProofViewModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="proof-modal-overlay" onClick={onClose}>
      <div className="proof-modal-card reveal active" onClick={(e) => e.stopPropagation()}>
        <div className="proof-modal-header">
          <div className="proof-modal-info">
            <h2 className="serif">Payment Verification</h2>
            <p>Order #{order.orderId || order._id} • {order.customer}</p>
          </div>
          <button className="proof-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="proof-modal-body">
          <div className="proof-image-container">
            <img 
              src={order.paymentScreenshot} 
              alt="Payment Proof" 
              className="proof-image"
            />
            <div className="proof-image-overlay">
              <a 
                href={order.paymentScreenshot} 
                target="_blank" 
                rel="noreferrer" 
                className="zoom-btn"
                title="View Full Resolution"
              >
                <Search size={20} /> Open Original 
              </a>
            </div>
          </div>
        </div>

        <div className="proof-modal-footer">
          <div className="order-context-brief">
            <div className="context-item">
              <span className="label">Amount</span>
              <span className="value">GH₵{order.total}</span>
            </div>
            <div className="context-item">
              <span className="label">Contact</span>
              <span className="value">{order.phone}</span>
            </div>
          </div>
          <button className="cta-button-premium shadowed" onClick={onClose} style={{ padding: '0.8rem 2rem' }}>
            Acknowledge Proof
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminOrders = ({ orders, addOrder, updateOrder, products, fetchOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedProof, setSelectedProof] = useState(null);
  const [adminSearch, setAdminSearch] = useState("");

  const [newOrder, setNewOrder] = useState({
    customer: "",
    phone: "",
    location: "",
    productName: products[0]?.name || "",
    qty: 1,
    payment: "Unpaid",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const prod = products.find((p) => p.name === newOrder.productName) || products[0];
    if (!prod) return;
    addOrder({
      customer: newOrder.customer,
      phone: newOrder.phone,
      location: newOrder.location,
      items: [{ 
        name: newOrder.productName, 
        qty: parseInt(newOrder.qty),
        selectedExtras: [] // Manual admin entry doesn't support picking extras yet in this simple form
      }],
      total: prod.price * newOrder.qty,
      payment: newOrder.payment,
      status: "Processing",
    });
    setShowModal(false);
    setNewOrder({ customer: "", phone: "", location: "", productName: products[0]?.name || "", qty: 1, payment: "Unpaid" });
  };

  const filteredOrders = orders.filter(o => {
    const searchLow = adminSearch.toLowerCase();
    return o.customer?.toLowerCase().includes(searchLow) || o.orderId?.toLowerCase().includes(searchLow);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="dashboard-view fade-in">
      <header className="admin-header">
        <div className="page-title"><h1 className="serif">Sales Log</h1><p>{filteredOrders.length} Records</p></div>
        <div className="header-actions" style={{ display: "flex", gap: "1rem" }}>
          <button onClick={fetchOrders} className="cta-button-premium" style={{ padding: "0.8rem 1.2rem", fontSize: "0.75rem", borderRadius: "12px", background: "var(--brand-red)", color: "white" }}>Sync</button>
          <button onClick={() => setShowModal(true)} className="cta-button-premium" style={{ padding: "0.8rem 1.5rem", fontSize: "0.75rem", borderRadius: "12px" }}>Record</button>
        </div>
      </header>
      {/* Table and pagination similar to Products */}
      <div className="admin-card" style={{ padding: "0" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Order ID</th><th>Date/Time</th><th>Customer</th><th>Location</th><th>Amount</th><th>Proof</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={order._id || order.id}>
                  <td data-label="#">{indexOfFirstItem + index + 1}</td>
                  <td data-label="Order ID" style={{ fontWeight: 700, color: "var(--brand-red)" }}>#{order.orderId || order.id}</td>
                  <td data-label="Date/Time">
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{order.date || new Date(order.createdAt).toLocaleDateString()}</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div>
                  </td>
                  <td data-label="Customer" style={{ fontWeight: 600 }}>{order.customer}</td>
                  <td data-label="Location" style={{ fontSize: '0.8rem', color: '#475569' }}>{order.location || 'N/A'}</td>
                  <td data-label="Amount">
                    <div style={{ fontSize: '0.8rem' }}>GH₵{order.total}</div>
                    {order.items.some(it => it.selectedExtras?.length > 0) && (
                      <div style={{ fontSize: '0.6rem', color: '#64748b', whiteSpace: 'nowrap' }}>Customized</div>
                    )}
                  </td>
                  <td data-label="Proof">
                    {order.paymentScreenshot ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProof(order);
                        }}
                        className="view-proof-btn"
                        title="View Payment Proof"
                      >
                        <Eye size={14} /> View Proof
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic' }}>No Proof</span>
                    )}
                  </td>
                  <td data-label="Status"><span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td data-label="Actions">
                    <div className="flex gap-1" style={{ alignItems: 'center' }}>
                      <select style={{ fontSize: '0.7rem', padding: '0.2rem', borderRadius: '4px' }} value={order.status} onChange={(e) => updateOrder(order._id || order.id, { status: e.target.value })}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button onClick={() => setSelectedReceipt(order)} title="View Receipt" style={{ padding: '0.3rem', background: '#f1f5f9', borderRadius: '4px', border: '1px solid #e2e8f0' }}><ReceiptCedi size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Order Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal-card modal-narrow" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-premium">
              <div>
                <h2 className="serif">Record Manual Order</h2>
                <p>Manually log an order into the sales system.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="sidebar-minimize-toggle">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="modal-content-scroll">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group-premium">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Customer Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newOrder.customer} 
                      onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                      placeholder="e.g. Ama Owusu"
                    />
                  </div>
                  <div className="form-group-premium">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Contact Number</label>
                    <input 
                      type="text" 
                      required 
                      value={newOrder.phone} 
                      onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                      placeholder="e.g. 024XXXXXXX"
                    />
                  </div>
                  <div className="form-group-premium">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Delivery Location</label>
                    <input 
                      type="text" 
                      required 
                      value={newOrder.location} 
                      onChange={(e) => setNewOrder({...newOrder, location: e.target.value})}
                      placeholder="e.g. East Legon"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                    <div className="form-group-premium">
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Select Meal</label>
                      <select 
                        value={newOrder.productName} 
                        onChange={(e) => setNewOrder({...newOrder, productName: e.target.value})}
                      >
                        {products.map((p, i) => (
                          <option key={i} value={p.name}>{p.name} - GH₵{p.price}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group-premium">
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Qty</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={newOrder.qty} 
                        onChange={(e) => setNewOrder({...newOrder, qty: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer-premium">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel-premium">Cancel</button>
                <button type="submit" className="cta-button-premium shadowed" style={{ flex: 2 }}>Record Sale</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedProof && <ProofViewModal order={selectedProof} isOpen={!!selectedProof} onClose={() => setSelectedProof(null)} />}
    </div>
  );
};

const AdminReceipts = ({ orders, updateOrder }) => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const currentItems = orders.slice(0, 10);

  return (
    <div className="dashboard-view fade-in">
      <header className="admin-header">
        <h1 className="serif">Generate Receipt</h1>
      </header>
      <div className="admin-card" style={{ padding: "0" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th><th>Receipt #</th><th>Customer</th><th>Meal(s)</th><th>Location</th><th>Total</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={order._id || order.id}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Receipt #">RC-{order.orderId?.split("-")[1] || "0000"}</td>
                  <td data-label="Customer" style={{ fontWeight: 600 }}>{order.customer}</td>
                  <td data-label="Meal(s)">
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                      {order.items.map((it, i) => (
                        <span key={i}>{it.name}{i < order.items.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Location" style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.location || 'N/A'}</td>
                  <td data-label="Total" style={{ fontWeight: 700, color: 'var(--brand-red)' }}>GH₵{order.total}</td>
                  <td data-label="Actions">
                    <button onClick={() => setSelectedReceipt(order)} className="cta-button-premium" style={{ padding: "0.6rem 1rem", fontSize: "0.75rem" }}>Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedReceipt && <ReceiptModal order={selectedReceipt} onClose={() => setSelectedReceipt(null)} />}
    </div>
  );
};

const AdminCategories = ({ categories, setCategories }) => {
  const [newCat, setNewCat] = useState("");
  const add = async (e) => {
    e.preventDefault();
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat.trim()]);
    }
    setNewCat("");
  };

  return (
    <div className="dashboard-view fade-in">
      <header className="admin-header"><h1 className="serif">Categories</h1></header>
      <div className="admin-card">
        <form onSubmit={add} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <input type="text" placeholder="New Category" value={newCat} onChange={(e) => setNewCat(e.target.value)} style={{ flex: 1, padding: "0.8rem", borderRadius: "12px", border: "1px solid #ddd" }} />
          <button type="submit" className="cta-button-premium"><Plus size={20} /></button>
        </form>
        <div className="admin-table-container">
          <table className="admin-table">
            <tbody>
              {categories.map((cat, i) => (
                <tr key={i}><td>{cat}</td><td style={{ textAlign: "right" }}><button onClick={() => setCategories(categories.filter(c => c !== cat))} style={{ color: "red" }}><Trash size={16} /></button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

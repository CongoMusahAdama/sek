import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, ShoppingBag, Award, LayoutGrid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ShopPage = ({ products = [], categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) => {
      const isSoldOut =
        product.status === "Sold Out" ||
        product.stock === 0 ||
        !!product.soldOutAt;
      if (isSoldOut && product.soldOutAt) {
        const soldDate = new Date(product.soldOutAt);
        const daysSoldOut = (new Date() - soldDate) / (1000 * 60 * 60 * 24);
        if (daysSoldOut > 3) return false;
      }

      const matchesCategory =
        activeCategory === "all" ||
        product.category?.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = parseFloat(product.price) <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High")
        return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === "Price: High to Low")
        return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => entry.isIntersecting && entry.target.classList.add("active"),
      );
    }, observerOptions);
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory, searchQuery, sortBy, maxPrice]);

  const categoryTabs = [
    { id: "all", label: "All Collections" },
    ...categories.map((c) =>
      typeof c === "object" ? c : { id: c.toLowerCase(), label: c },
    ),
  ];

  return (
    <div className="shop-page-wrapper">
      <section className="shop-hero">
        <div className="center-text reveal">
          <span className="shop-hero-brand">Sekina Special Menu</span>
          <h1 className="serif shop-hero-title">Delicious Local Meals</h1>
        </div>
      </section>

      <section className="shop-section">
        <div className="container">
          <div className="shop-layout">
            <aside
              className={`shop-sidebar ${showFilters ? "mobile-open" : ""}`}
            >
              <div className="sidebar-inner">
                <div className="sidebar-header mobile-only">
                  <h3 className="serif">Filter & Sort</h3>
                  <button
                    className="close-filters"
                    onClick={() => setShowFilters(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="sidebar-section">
                  <h4 className="sidebar-title">Search</h4>
                  <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Find your product..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sidebar-section">
                  <h4 className="sidebar-title">Categories</h4>
                  <div className="category-list">
                    {categoryTabs.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          if (window.innerWidth <= 767) setShowFilters(false);
                        }}
                        className={`category-item-btn ${activeCategory === cat.id ? "active" : ""}`}
                      >
                        <span className="cat-icon">
                          {cat.id === "all" && <ShoppingBag size={18} />}
                          {cat.id !== "all" && <Award size={18} />}
                        </span>
                        <span className="cat-label">{cat.label}</span>
                        <span className="cat-count">
                          {cat.id === "all"
                            ? products.length
                            : products.filter(
                                (p) => p.category?.toLowerCase() === cat.id,
                              ).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sidebar-section">
                  <h4 className="sidebar-title">Price Range</h4>
                  <div className="price-filter">
                    <div className="price-labels">
                      <span>GH₵0</span>
                      <span>GH₵{maxPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="10"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="price-slider"
                    />
                    <p className="price-hint">Under GH₵{maxPrice}</p>
                  </div>
                </div>

                <div className="sidebar-section mobile-only">
                  <h4 className="sidebar-title">Sort By</h4>
                  <div className="mobile-sort-options">
                    {[
                      "Recommended",
                      "Price: Low to High",
                      "Price: High to Low",
                    ].map((opt) => (
                      <button
                        key={opt}
                        className={`sort-option-btn ${sortBy === opt ? "active" : ""}`}
                        onClick={() => {
                          setSortBy(opt);
                          setShowFilters(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sidebar-footer mobile-only">
                  <button
                    className="apply-btn"
                    onClick={() => setShowFilters(false)}
                  >
                    Show {filteredProducts.length} Results
                  </button>
                </div>
              </div>
            </aside>

            <div className="shop-content">
              <div className="mobile-shop-header mobile-only">
                <div className="mobile-page-title-area">
                  <h1 className="mobile-shop-title">Shop All</h1>
                  <p className="mobile-shop-subtitle">
                    Sekina Special — Authentic Ghanaian Flavors
                  </p>
                </div>

                <div className="mobile-search-bar">
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    size={22}
                    className="mobile-search-icon"
                    color="#999"
                  />
                </div>

                <div className="mobile-filter-controls">
                  <div className="mobile-sort-select-wrapper">
                    <select
                      className="mobile-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option>Recommended</option>
                      <option>Price: High to Low</option>
                      <option>Price: Low to High</option>
                    </select>
                  </div>
                  <div className="mobile-view-toggles">
                    <button className="mobile-view-btn active">
                      <LayoutGrid size={20} />
                    </button>
                    <button className="mobile-view-btn">
                      <List size={20} />
                    </button>
                  </div>
                </div>

                <div className="mobile-category-filters">
                  <p className="mobile-filter-label">FILTER BY CATEGORY</p>
                  <div className="mobile-category-scroll-row">
                    {categoryTabs.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`mobile-cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                      >
                        {activeCategory === cat.id && (
                          <div className="cat-icon-circle">
                            <ShoppingBag size={12} color="var(--brand-red)" />
                          </div>
                        )}
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mobile-item-count">
                  Showing <b>{filteredProducts.length}</b> items
                </div>
              </div>

              <div className="shop-toolbar desktop-only reveal">
                <div className="results-info">
                  Showing{" "}
                  <span className="highlight">{filteredProducts.length}</span>{" "}
                  delicious choices
                </div>
                <div className="toolbar-actions">
                  <label>Sort By:</label>
                  <select
                    className="premium-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              {(activeCategory !== "all" || searchQuery || maxPrice < 200) && (
                <div className="active-filters-row">
                  {activeCategory !== "all" && (
                    <div className="filter-chip">
                      {categoryTabs.find((c) => c.id === activeCategory)?.label}
                      <X size={14} onClick={() => setActiveCategory("all")} />
                    </div>
                  )}
                  {searchQuery && (
                    <div className="filter-chip">
                      "{searchQuery}"
                      <X size={14} onClick={() => setSearchQuery("")} />
                    </div>
                  )}
                  {maxPrice < 200 && (
                    <div className="filter-chip">
                      Under GH₵{maxPrice}
                      <X size={14} onClick={() => setMaxPrice(200)} />
                    </div>
                  )}
                </div>
              )}

              <div className="shop-results-container">
                {filteredProducts.length > 0 ? (
                  <div className="product-grid-shop fade-in">
                    {filteredProducts.map((p) => (
                      <ProductCard key={p._id || p.id} {...p} />
                    ))}
                  </div>
                ) : (
                  <div className="no-results reveal">
                    <div className="no-results-icon">
                      <Search size={48} />
                    </div>
                    <h3>No products match your criteria</h3>
                    <p>
                      Try adjusting your filters or searching for something else.
                    </p>
                    <button
                      className="clear-all-btn"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                        setMaxPrice(200);
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFilters && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setShowFilters(false)}
        ></div>
      )}

      {/* Recently Viewed Section */}
      <section className="recently-viewed-section section-padding" style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="reveal mb-10">
            <h2 className="serif" style={{ fontSize: '2rem' }}>Recently Viewed</h2>
            <p style={{ color: '#64748b' }}>Pick up where you left off</p>
          </div>
          <div className="product-grid-shop">
            {products
              .filter(p => {
                const recents = JSON.parse(localStorage.getItem('sekina_recent') || '[]');
                return recents.includes(p._id || p.id);
              })
              .sort((a, b) => {
                const recents = JSON.parse(localStorage.getItem('sekina_recent') || '[]');
                return recents.indexOf(a._id || a.id) - recents.indexOf(b._id || b.id);
              })
              .slice(0, 4)
              .map(p => (
                <ProductCard key={p._id || p.id} {...p} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;

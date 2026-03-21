import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X, ArrowRight, Instagram, Facebook, Ghost } from "lucide-react";
import { useCart } from "../context/CartContext";

const NavCartButton = () => {
  const { cartCount, setIsCartOpen, shouldBump } = useCart();
  return (
    <button
      className="icon-link nav-cart-btn flex items-center gap-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCartOpen(true);
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "inherit",
      }}
    >
      <div className={`cart-icon-wrapper ${shouldBump ? 'bump' : ''}`}>
        <ShoppingCart size={20} strokeWidth={1.5} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
      <span className="nav-icon-label">Cart</span>
    </button>
  );
};

// Internal sub-component
import { ShoppingCart } from "lucide-react";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>
      <div className="search-overlay-content">
        <button className="search-overlay-close" onClick={onClose}>
          <X size={32} strokeWidth={1.5} />
        </button>
        <div className="container center-text">
          <span className="search-overlay-label">Find Your Flavor</span>
          <form onSubmit={handleSearch} className="search-overlay-form">
            <input
              type="text"
              autoFocus
              placeholder="Searching for your favorite Ghanaian meal..."
              className="search-overlay-input serif"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-overlay-btn">
              <ArrowRight size={32} />
            </button>
          </form>
          <div className="search-overlay-suggestions">
            <p>
              Popular: 
              <strong onClick={() => { setQuery("Waakye"); navigate("/shop?q=Waakye"); onClose(); }}> Waakye</strong>,
              <strong onClick={() => { setQuery("Fried Rice"); navigate("/shop?q=Fried Rice"); onClose(); }}> Fried Rice</strong>,
              <strong onClick={() => { setQuery("Jollof"); navigate("/shop?q=Jollof"); onClose(); }}> Jollof</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/auth" || location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  if (isAuthPage) return null;

  return (
    <>
      <header className={`header ${isScrolled || !isHome ? "scrolled" : ""}`}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Sekina Special" style={{ height: '50px', width: 'auto' }} />
            </Link>
            <nav className="nav-menu desktop-only">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/shop" className="nav-link">
                Menu
              </Link>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
              {user && (
                <Link to="/admin" className="nav-link" style={{ color: 'var(--brand-red)', fontWeight: 800 }}>
                  Kitchen Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="nav-icons">
            <button
              className="icon-link"
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                position: "relative",
              }}
            >
              <span className="nav-icon-label">Search</span>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <a href="#" className="icon-link desktop-only">
              <Heart size={20} strokeWidth={1.5} />
            </a>
            <NavCartButton />
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <Link
            to="/"
            className="logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="/logo.png"
              alt="Sekina Special"
              className="logo-img"
              style={{ height: '40px' }}
            />
          </Link>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          {user && (
            <Link
              to="/admin"
              className="mobile-nav-link"
              style={{ color: 'var(--brand-red)', fontWeight: 800 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kitchen Dashboard
            </Link>
          )}
        </nav>
        <div className="mobile-nav-footer">
          <div className="mobile-social-links">
            <a href="https://www.instagram.com/sekinaspecial" target="_blank" rel="noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/sekinaspecial" target="_blank" rel="noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://www.tiktok.com/@sekinaspecial" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 800 }}>T</span>
            </a>
            <a href="https://www.snapchat.com/add/sekinaspecial" target="_blank" rel="noreferrer">
              <Ghost size={20} />
            </a>
          </div>
          <p>
            © 2026 Sekina Special. Authentic Ghanaian Flavors.
          </p>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

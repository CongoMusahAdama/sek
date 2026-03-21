import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageCircle, Mail, Instagram, Facebook, Ghost, ArrowRight } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/auth" || location.pathname.startsWith("/admin"))
    return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/" className="logo footer-logo">
              <img
                src="/logo.png"
                alt="Sekina Special"
                className="footer-logo-img"
                style={{ height: '60px', width: 'auto' }}
              />
            </a>
            <p className="footer-desc">
              Authentic Ghanaian flavors served with love. Sekina Special brings you the best of local meals right to your doorstep.
            </p>
            <div className="flex flex-col gap-3" style={{ marginTop: "2rem" }}>
              <div className="flex items-center gap-3 footer-desc">
                <Phone size={16} className="text-brand-red" />
                <span>+233 54 816 4756 (Ordering)</span>
              </div>
              <div className="flex items-center gap-3 footer-desc">
                <MessageCircle size={16} className="text-brand-red" />
                <span>+233 24 750 8412 (WhatsApp/Call)</span>
              </div>
              <div className="flex items-center gap-3 footer-desc">
                <Mail size={16} className="text-brand-red" />
                <span style={{ fontSize: "0.85rem" }}>
                  hello@sekinaspecial.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <Link to="/shop">Main Dishes</Link>
              </li>
              <li>
                <Link to="/shop">Street Food</Link>
              </li>
              <li>
                <Link to="/shop">Special Meals</Link>
              </li>
              <li>
                <Link to="/shop">View Menu</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Connect With Us</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.instagram.com/sekinaspecial" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Instagram size={16} /> @sekinaspecial
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/sekinaspecial" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Facebook size={16} /> Sekina Special
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@sekinaspecial" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <span style={{ fontWeight: 800 }}>T</span> @sekinaspecial
                </a>
              </li>
              <li>
                <a href="https://www.snapchat.com/add/sekinaspecial" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Ghost size={16} /> @sekinaspecial
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-desc" style={{ marginBottom: "1rem" }}>
              Join the Sekina family. Get updates on new meals and specials.
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="YOUR EMAIL"
                style={{
                  padding: "0.8rem",
                  background: "#222",
                  border: "none",
                  color: "white",
                  width: "100%",
                }}
              />
              <button
                className="bg-brand-red"
                style={{ padding: "0 1rem", color: "white" }}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Sekina Special. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

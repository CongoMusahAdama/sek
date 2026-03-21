import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Shield, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { apiRequest } from "../utils/api";

const AuthPage = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const res = await apiRequest("/auth/login", "POST", {
      identifier,
      password,
    });

    if (res.success) {
      Swal.fire({
        title: `Welcome Back, ${res.name && res.name !== "Sekina Admin" && res.name !== "Admin"
          ? res.name.split(" ")[0]
          : "Sekina"
          }!`,
        text: `Success! Authenticated as ${res.name || "Sekina "}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#fff",
        color: "#1a202c",
        iconColor: "var(--brand-red)",
        customClass: {
          popup: "premium-swal-popup",
        },
      });
      onLogin(res);
      navigate("/admin");
    } else {
      setError(res.message || "Invalid credentials");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <img src="/hero section.png" alt="Admin Background" />
        <div className="auth-overlay"></div>
      </div>

      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <div className="auth-container">
        <div className={`auth-card glass reveal ${isLoaded ? "active" : ""}`}>
          <div className="auth-card-header">
            <Link to="/" className="auth-logo-link">
              <img
                src="/logo.png"
                alt="Sekina Special"
                className="auth-logo"
                style={{ height: '60px', width: 'auto', borderRadius: '12px' }}
              />
            </Link>
            <h2 className="serif">Admin Gateway</h2>
            <p className="auth-subtitle">Restricted Access • Secure Login</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="auth-error-msg">{error}</div>}

            <div className="auth-input-wrapper">
              <label>Email or Phone</label>
              <div className="auth-input-group">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  required
                  placeholder="admin@sekinaspecial.com or +233..."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-wrapper">
              <label>Password</label>
              <div className="auth-input-group">
                <Shield className="input-icon" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting ? "Authenticating..." : "Enter Dashboard"}
              </span>
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <footer className="auth-card-footer">
            <p className="auth-footer-text">
              Secure 256-bit encrypted portal. <br />
              Authorized Sekina Special Personnel Only.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CollectionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("active"),
        );
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="collections-page">
      <section className="collections-hero">
        <div className="collections-hero-bg"></div>
        <div className="container center-text reveal">
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              fontSize: "0.9rem",
            }}
          >
            Sekina Special
          </span>
          <h1 className="serif" style={{ fontSize: "5rem", marginTop: "1rem" }}>
            Our Menu
          </h1>
        </div>
      </section>

      <section className="section-padding container">
        <div
          className="flex justify-between items-end reveal"
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ maxWidth: "600px" }}>
            <h2 className="serif" style={{ fontSize: "3.5rem" }}>
              The Art of Cooking
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                color: "#666",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              Explore our curated selection of Ghanaian meals, where each dish tells a unique story of local flavors, passion, and cultural heritage.
            </p>
          </div>
        </div>

        <div className="collections-main-grid">
          <div className="large-collection-card reveal">
            <img src="/waakye.png" alt="Main Dishes" />
            <div
              className="hero-overlay"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              }}
            ></div>
            <div className="collection-overlay-content">
              <span className="collection-type">Popular</span>
              <h3 className="serif" style={{ fontSize: "3rem" }}>
                Main Dishes
              </h3>
              <p style={{ margin: "1rem 0 2rem", opacity: 0.8 }}>
                Authentic Waakye, Jollof, and Fried Rice served with all the trimmings.
              </p>
              <Link
                to="/shop"
                className="cta-button"
                style={{ display: "inline-block" }}
              >
                Explore Range
              </Link>
            </div>
          </div>

          <div className="large-collection-card reveal">
            <img src="/fried rice.png" alt="Street Food" />
            <div
              className="hero-overlay"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              }}
            ></div>
            <div className="collection-overlay-content">
              <span className="collection-type">Quick Bites</span>
              <h3 className="serif" style={{ fontSize: "3rem" }}>
                Street Food
              </h3>
              <p style={{ margin: "1rem 0 2rem", opacity: 0.8 }}>
                The best of Ghanaian street food, from Indomie to Angwa Mu.
              </p>
              <Link
                to="/shop"
                className="cta-button"
                style={{ display: "inline-block" }}
              >
                Explore Range
              </Link>
            </div>
          </div>

          <div
            className="large-collection-card reveal"
            style={{ gridColumn: "span 2", height: "600px" }}
          >
            <img src="/hero section.png" alt="Sekina Signature Selection" />
            <div
              className="hero-overlay"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              }}
            ></div>
            <div
              className="collection-overlay-content"
              style={{ maxWidth: "600px" }}
            >
              <span className="collection-type">Signature Dishes</span>
              <h3 className="serif" style={{ fontSize: "3.5rem" }}>
                Sekina's Choice
              </h3>
              <p style={{ margin: "1rem 0 2rem", opacity: 0.8 }}>
                Our most exclusive recipes, featuring our signature Nkotomire stew and special Fried Rice.
              </p>
              <Link to="/shop" className="cta-button-premium">
                Explore All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;

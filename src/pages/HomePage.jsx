import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Quote } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const HomePage = ({ products = [], categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryTabs = [
    { id: "all", label: "All Collections" },
    ...categories.map((c) =>
      typeof c === "object" ? c : { id: c.toLowerCase(), label: c },
    ),
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
  }, [activeCategory]);

  const filteredFeatured = products
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

      if (
        activeCategory !== "all" &&
        product.category?.toLowerCase() !== activeCategory.toLowerCase()
      )
        return false;
      const img = product.image || "";
      if (img.startsWith("blob:")) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    })
    .slice(0, 16);

  return (
    <>
      <Hero />
      <section
        id="featured-meals"
        className="section-padding featured-meals-section"
        style={{
          padding: "5rem 0",
          backgroundColor: "var(--brand-red)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="food-pattern-overlay"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="flex justify-between items-end mb-12">
            <div className="reveal">
              <span
                className="text-yellow"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  fontSize: "0.8rem",
                  color: "#FFD700",
                }}
              >
                Fresh & Delicious
              </span>
            </div>
            <Link
              to="/shop"
              className="nav-link reveal"
              style={{
                marginBottom: "1rem",
                color: "white",
                borderBottomColor: "white",
              }}
            >
              Explore Our Menu
            </Link>
          </div>

          <div className="regimes-premium-grid">
            <div className="regimes-image-box reveal">
              <div className="image-wrapper-stack">
                <img
                  src="/waakye.png"
                  alt="Delicious Waakye"
                  className="regimes-img-1"
                />
                <img
                  src="/fried%20rice.png"
                  alt="Ghanaian Fried Rice"
                  className="regimes-img-2"
                />
              </div>
            </div>

            <div className="regimes-info-box reveal">
              <div className="premium-accent-line"></div>
              
              <h2 className="serif text-white mb-6" style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                Our Signature <span className="text-yellow-accent">Meals</span>
              </h2>
              
              <p className="regimes-description">
                Experience the authentic taste of Ghana with our carefully prepared signature meals, 
                made with tradition and the finest local spices.
              </p>

              <ul className="regimes-list">
                <li>
                  <Sparkles size={18} color="var(--brand-yellow)" />{" "}
                  <span>Waakye</span>
                </li>
                <li>
                  <Sparkles size={18} color="var(--brand-yellow)" />{" "}
                  <span>Ghanian Fried Rice</span>
                </li>
                <li>
                  <Sparkles size={18} color="var(--brand-yellow)" />{" "}
                  <span>Plain Rice & Nkotomire Stew</span>
                </li>
                <li>
                  <Sparkles size={18} color="var(--brand-yellow)" />{" "}
                  <span>Angwa Mu (Oil Rice)</span>
                </li>
                <li>
                  <Sparkles size={18} color="var(--brand-yellow)" />{" "}
                  <span>Indomie Special</span>
                </li>
              </ul>

              <div className="flex gap-6 mt-10">
                <Link
                  to="/shop"
                  className="cta-button-premium"
                  style={{ background: "var(--brand-yellow)", color: "var(--brand-black)", padding: "1rem 2.2rem", fontSize: "0.85rem", borderRadius: '4px' }}
                >
                  <span>Explore Full Menu</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="container">
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2
              className="serif"
              style={{ fontSize: "3rem", marginTop: "0.5rem" }}
            >
              Our Signature Meals
            </h2>

            <div className="category-pills-container reveal">
              <div className="category-pills-scroll">
                {categoryTabs.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`category-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-grid">
            {filteredFeatured.map((product) => (
              <ProductCard
                key={product._id || product.id}
                {...product}
                id={product._id || product.id}
              />
            ))}
          </div>
          <div className="flex justify-center" style={{ marginTop: "5rem" }}>
            <Link to="/shop" className="cta-button-premium reveal">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div
            className="reveal"
            style={{ padding: "2rem", border: "1px solid #eee" }}
          >
            <img
              src="/ghanaexperience.png"
              alt="Authentic Sekina Special"
              className="heart-ghana-img"
              style={{ width: "100%", height: "620px", objectFit: "cover", borderRadius: '8px', boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
            />
          </div>
          <div className="reveal">
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginBottom: "2rem" }}
            >
              Taste the Authentic Essence of Sekina Special.
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                marginBottom: "2.5rem",
              }}
            >
              At Sekina Special, we believe that food is a celebration of
              community and culture. Our authentic recipes are passed down
              through generations, prepared with locally sourced ingredients
              and a commitment to flavor that feels like home.
            </p>
            <Link
              to="/about"
              className="cta-button"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Testimonials
            </span>
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginTop: "0.5rem" }}
            >
              What Our Foodies Say
            </h2>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card reveal">
              <Quote
                className="text-brand-red"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "The most incredible Waakye I've ever tasted! The shito has the perfect kick, and the wele is so soft. Sekina Special is truly the best in town."
              </p>
              <div className="testimonial-author">
                <strong>Ama Serwaa</strong>
                <span>Frequent Diner</span>
              </div>
            </div>

            <div
              className="testimonial-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <Quote
                className="text-brand-red"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "Sekina's Fried Rice is a game changer for my lunch breaks. The chicken is always crispy and well-seasoned. I don't just eat; I enjoy a culinary experience."
              </p>
              <div className="testimonial-author">
                <strong>Kofi Mensah</strong>
                <span>Graphic Designer</span>
              </div>
            </div>

            <div
              className="testimonial-card reveal"
              style={{ transitionDelay: "0.4s" }}
            >
              <Quote
                className="text-brand-red"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "Exceptional quality and fast delivery. They don't just sell food; they serve happiness. Every meal from Sekina Special feels like a homepage treat."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Baidoo</strong>
                <span>Content Creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

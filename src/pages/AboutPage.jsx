import React, { useEffect } from "react";
import { Shield, Globe, Award, Phone, MessageCircle, Mail, Instagram, Facebook, Ghost } from "lucide-react";

const AboutPage = () => {
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
    <div className="about-page">
      <section className="about-hero">
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
            Our Passion
          </h1>
        </div>
      </section>

      <section className="section-padding container">
        <div className="about-story-grid">
          <div className="reveal">
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "var(--brand-red)",
              }}
            >
              Established 2025
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "3.5rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              A Legacy of Ghanaian Flavor.
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#666",
                lineHeight: "1.8",
                marginBottom: "2rem",
              }}
            >
              Sekina Special was born from a simple yet profound realization: that authentic local meals are the ultimate key to health and happiness. For years, we have been perfecting our recipes.
            </p>
            <p style={{ color: "#666", lineHeight: "1.8" }}>
              Our journey began with cooking traditional meals in a small kitchen. Today, we are proud to be a premier destination for those who seek food that reflects our rich cultural heritage.
            </p>
          </div>
          <div className="heritage-image-wrapper reveal">
            <img
              src="/waakye.png"
              alt="Sekina Special Traditional Waakye"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--brand-red)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="food-pattern-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "#FFD700",
              }}
            >
              Our Philosophy
            </span>
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginTop: "1rem", color: "white" }}
            >
              Values That Define Us
            </h2>
          </div>

          <div className="values-grid">
            <div
              className="value-card reveal"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "#FFD700" }}>
                <Shield size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Pure Ingredients
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                We source only the freshest local ingredients, from farm-fresh vegetables to premium local grains, ensuring every meal is authentic.
              </p>
            </div>

            <div
              className="value-card reveal"
              style={{
                transitionDelay: "0.2s",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "#FFD700" }}>
                <Globe size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Global Reach
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                Our recipes are inspired by centuries-old Ghanaian traditions, perfected 
                to serve the most authentic local flavors to foodies across the country.
              </p>
            </div>

            <div
              className="value-card reveal"
              style={{
                transitionDelay: "0.4s",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "var(--brand-yellow)" }}>
                <Award size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Customer Service
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                Sekina Special is your partner in good eating. We ensure every meal is delivered hot and with a smile.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="contact-luxury-section section-padding"
        style={{ backgroundColor: "var(--brand-red)", color: "white" }}
      >
        <div className="food-pattern-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 5 }}>
          <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
            <div className="reveal" style={{ flex: 1 }}>
              <span
                className="text-yellow"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                Get in Touch
              </span>
              <h2
                className="serif"
                style={{ fontSize: "4.5rem", marginTop: "1rem", lineHeight: 1 }}
              >
                Contact <br />
                Sekina Special
              </h2>
            </div>
            <div className="reveal" style={{ flex: 1, paddingTop: "2.5rem" }}>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.8",
                  maxWidth: "500px",
                }}
              >
                Whether you have a question about our menu, want to place a large order, or discuss a catering partnership, we are here to assist you.
              </p>
            </div>
          </div>

          <div className="contact-luxury-grid">
            <div className="contact-main-card reveal">
              <div className="contact-methods-stack">
                <div className="contact-premium-item">
                  <div className="icon-wrap">
                    <Phone size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>Call & Payment</label>
                    <a href="tel:+233548164756">+233 54 816 4756 (Ordering)</a>
                  </div>
                </div>

                <div className="contact-premium-item">
                  <div
                    className="icon-wrap"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>WhatsApp / Call</label>
                    <a href="https://wa.me/233247508412">+233 24 750 8412</a>
                  </div>
                </div>

                <div className="contact-premium-item">
                  <div className="icon-wrap">
                    <Mail size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>Professional Inquiries</label>
                    <a href="mailto:hello@sekinaspecial.com">
                      hello@sekinaspecial.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="social-community-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <h3
                className="serif"
                style={{ fontSize: "2.5rem", marginBottom: "2rem" }}
              >
                Join the Community
              </h3>
              <div className="social-pill-grid">
                <a href="#" className="social-luxury-pill instagram">
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-luxury-pill facebook">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-luxury-pill tiktok">
                  <span style={{ fontWeight: 900, fontSize: "0.9rem" }}>T</span>
                  <span>TikTok</span>
                </a>
              </div>
              <div
                className="community-stat"
                style={{
                  marginTop: "3rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.6,
                    letterSpacing: "0.1em",
                  }}
                >
                  JOIN OVER 10,000+ HAPPY FOOD LOVERS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div
          className="center-text reveal"
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
        >
          <h2
            className="serif"
            style={{ fontSize: "3rem", marginBottom: "2rem" }}
          >
            Experience Authentic Flavors Today.
          </h2>
          <p
            style={{ fontSize: "1.2rem", color: "#666", marginBottom: "3rem" }}
          >
            Join the thousands of food lovers who have fallen in love with our 
            authentic Ghanaian home-cooked meals.
          </p>
            <a href="/shop" className="cta-button-premium">
            Explore Menu
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

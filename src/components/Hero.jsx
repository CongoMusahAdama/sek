import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-accent hero-bg-accent-1"></div>
      <div className="hero-bg-accent hero-bg-accent-2"></div>

      <img
        src="/hero section.png"
        alt="Sekina Special - Authentic Ghanaian Flavors"
        className="hero-image active"
      />
      <div className="hero-overlay"></div>

      <div className="hero-content-wrapper">
        <div className="hero-content">
          
          <h1 className="hero-slogan serif fade-in-delayed">
            <span className="text-highlight">Delicious</span> Local Meals,{" "}
            Ready When You Are
          </h1>
          
          <p className="hero-description fade-in-delayed-more">
            Enjoy freshly prepared Ghanaian favorites made with authentic flavors. 
            From Waakye to Fried Rice and Angwa Mu, order your favorite meal quickly 
            and have it ready for pickup or delivery.
          </p>

          <div className="hero-actions fade-in-delayed-more">
            <Link to="/shop" className="cta-button-premium">
              <span>Order Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/shop" className="hero-secondary-link">
              View Menu
            </Link>
          </div>
          
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;

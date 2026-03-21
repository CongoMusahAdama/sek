import React, { useState, useEffect } from "react";
import { CheckCircle, Plus, MessageCircle, PackageX } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

const ProductCard = ({
  id,
  _id,
  name,
  price,
  discountPrice,
  badge,
  image,
  status,
  stock,
  soldOutAt,
  comesWithPouch,
  sku,
  extras,
  sizes
}) => {
  const resolvedId = _id || id;
  const isSoldOut = status === "Sold Out" || stock === 0 || !!soldOutAt;
  const { cartItems, addToCart } = useCart();
  const { openProduct } = useModal();
  const cartItem = cartItems.find((i) => i.cartId === resolvedId || i.id === resolvedId);
  const inCart = !!cartItem;
  const resolvedImage =
    image && !image.startsWith("blob:") ? image : "/waakye.png";
  const currentPrice = discountPrice || price;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const hasExtras = extras && extras.length > 0;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e) => {
    if (!isSoldOut) {
      openProduct({
        id: resolvedId,
        _id: resolvedId,
        name,
        price,
        discountPrice,
        badge,
        image: resolvedImage,
        comesWithPouch,
        sku,
        extras,
        sizes
      });
    }
  };

  return (
    <div
      className="product-card reveal"
      onClick={handleClick}
      style={{
        opacity: isSoldOut ? 0.6 : 1,
        filter: isSoldOut ? "grayscale(100%)" : "none",
        cursor: isSoldOut ? "not-allowed" : "pointer",
        position: 'relative'
      }}
    >
      {sku && (
        <div className="product-sku-tag" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'var(--brand-red)',
          zIndex: 5,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {sku}
        </div>
      )}
      <div className="product-image-container">
        {isSoldOut ? (
          <div
            className="product-badge"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              zIndex: 10,
              padding: "0.4rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 800,
            }}
          >
            SOLD OUT
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 5,
            }}
          >
            {badge && (
              <div
                className="product-badge"
                style={{ position: "relative", top: 0, left: 0 }}
              >
                {badge}
              </div>
            )}
            {discountPrice && (
              <div
                className="product-badge"
                style={{
                  backgroundColor: "#ef4444",
                  position: "relative",
                  top: 0,
                  left: 0,
                }}
              >
                SALE
              </div>
            )}
            {hasExtras && (
              <div
                className="product-badge"
                style={{
                  backgroundColor: "#6366f1",
                  color: "#fff",
                  position: "relative",
                  top: 0,
                  left: 0,
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                }}
              >
                <Plus size={10} /> ADD EXTRAS
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <div
            className="product-price-badge"
            style={{
              backgroundColor: discountPrice ? "#ef4444" : "#f0fdf4",
              color: discountPrice ? "#fff" : "#16a34a",
              border: discountPrice ? "none" : "1px solid #dcfce7",
              cursor: 'pointer'
            }}
            onClick={handleClick}
          >
            <span style={{ fontWeight: 800 }}>GH₵{currentPrice}</span>
          </div>
        )}
        {inCart && (
          <div className="product-in-cart-badge">
            <CheckCircle size={14} />
            <span>In Cart</span>
          </div>
        )}
        <img 
          src={resolvedImage} 
          alt={name} 
          className="product-main-image" 
          onError={(e) => { e.target.src = "/waakye.png"; }}
        />
        <img
          src={resolvedImage}
          alt={name}
          className="product-hover-image"
          style={{ filter: "brightness(0.95)" }}
          onError={(e) => { e.target.src = "/waakye.png"; }}
        />
      </div>
      <div className="product-details">
        <h4 className="product-name">{name}</h4>

        {isMobile && (
          <p
            className="product-mobile-subtitle"
            style={{ color: "var(--yellow-accent)", fontWeight: "700" }}
          >
            {badge || "SEKINA SPECIAL"}
          </p>
        )}

        {!isMobile && (
          <div className="product-desktop-actions">
            <p
              className="product-price"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {discountPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#94a3b8",
                    fontSize: "0.85em",
                  }}
                >
                  GH₵{price}
                </span>
              )}
              <span
                style={{
                  color: discountPrice ? "#ef4444" : "#16a34a",
                  fontWeight: "700",
                }}
              >
                GH₵{currentPrice}
              </span>
            </p>
            <button
              className="add-to-cart-btn"
              disabled={isSoldOut}
              style={{
                cursor: isSoldOut ? "not-allowed" : "pointer",
                opacity: isSoldOut ? 0.6 : 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSoldOut)
                  addToCart({
                    id: resolvedId,
                    name,
                    price: currentPrice,
                    badge,
                    image: resolvedImage,
                  });
              }}
            >
              <Plus size={16} /> {isSoldOut ? "Sold Out" : "Add to Cart"}
            </button>
            <div className="product-social-buy">
              {isSoldOut ? (
                <span
                  className="direct-wa-button"
                  style={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                    background: "#e2e8f0",
                    color: "#94a3b8",
                  }}
                >
                  Currently Unavailable
                </span>
              ) : (
                <a
                  href={`https://wa.me/233247508412?text=${encodeURIComponent(`Hi Sekina Special! I'm interested in ordering:\n*Meal:* ${name}\n*Price:* GH₵${currentPrice}\n\n*My Delivery Location:* [Please enter your location here]\n\nAre you available?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="direct-wa-button"
                >
                  Direct WhatsApp Order
                </a>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="product-mobile-actions-wrapper">
            <div className="mobile-buy-info">
              {isSoldOut ? (
                <span className="direct-buy-msg" style={{ color: "#ef4444" }}>
                  <PackageX size={10} style={{ marginRight: "4px" }} />
                  Currently Out of Stock
                </span>
              ) : (
                <span className="direct-buy-msg">
                  <MessageCircle size={10} style={{ marginRight: "4px" }} />
                  Order direct on WhatsApp & IG
                </span>
              )}
            </div>
            <div className="product-mobile-actions">
              <span className="mobile-price">
                {discountPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      fontSize: "0.85em",
                      marginRight: "4px",
                    }}
                  >
                    GH₵{price}
                  </span>
                )}
                <span style={{ color: discountPrice ? "#ef4444" : "inherit" }}>
                  GH₵{currentPrice}
                </span>
                {hasExtras && !isSoldOut && (
                  <span style={{ 
                    display: 'block', 
                    fontSize: '0.6rem', 
                    color: '#6366f1', 
                    fontWeight: 700,
                    marginTop: '2px'
                  }}>
                    + Tap for Extras
                  </span>
                )}
              </span>
              <button
                className="mobile-add-btn"
                disabled={isSoldOut}
                style={{ background: isSoldOut ? "#ef4444" : "" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSoldOut)
                    addToCart({
                      id: resolvedId,
                      name,
                      price: currentPrice,
                      badge,
                      image: resolvedImage,
                    });
                }}
              >
                {isSoldOut ? (
                  <PackageX size={18} color="white" />
                ) : (
                  <Plus size={18} color="white" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

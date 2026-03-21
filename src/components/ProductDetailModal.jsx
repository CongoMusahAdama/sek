import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, CheckCircle, MessageCircle, Instagram } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

const ProductDetailModal = () => {
  const { selectedProduct, closeProduct } = useModal();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      setQty(1);
      const availableSizes = selectedProduct.sizes || [];
      if (availableSizes.length > 0) {
        setSize(availableSizes[0]);
      } else {
        setSize("");
      }
      setSelectedExtras([]);

      // Update recently viewed
      const recentlyViewed = JSON.parse(localStorage.getItem('sekina_recent') || '[]');
      const currentId = selectedProduct._id || selectedProduct.id;
      const filtered = recentlyViewed.filter(id => id !== currentId);
      const updated = [currentId, ...filtered].slice(0, 10);
      localStorage.setItem('sekina_recent', JSON.stringify(updated));
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    const qtyNum = parseInt(qty) || 1;
    // Pass qty directly — avoids React state-batching bug from calling addToCart in a loop
    addToCart(selectedProduct, size, selectedExtras, qtyNum);

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeProduct();
    }, 800);
  };

  const {
    name,
    price,
    discountPrice,
    discountPercentage,
    badge,
    image,
    sizes,
    extras
  } = selectedProduct;
  
  const finalDiscountPrice =
    discountPrice ||
    (discountPercentage > 0
      ? (price * (1 - discountPercentage / 100)).toFixed(2)
      : null);

  return (
    <div className="product-modal-backdrop" onClick={closeProduct}>
      <div
        className="product-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={closeProduct}>
          <X size={20} />
        </button>

        {/* LEFT — image */}
        <div className="modal-image-container">
          <img src={image} alt={name} />
          {badge && <div className="modal-badge">{badge}</div>}
        </div>

        {/* RIGHT — scrollable info panel */}
        <div className="modal-scroll-area">
          <div className="modal-info">
            <h2 className="modal-title serif">{name}</h2>
            {selectedProduct.sku && (
              <p className="modal-sku">
                Product ID: {selectedProduct.sku}
              </p>
            )}
            <p className="modal-price" style={{ color: "#16a34a", fontWeight: "700" }}>
              {finalDiscountPrice ? (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      fontSize: "0.85em",
                      marginRight: "0.5rem",
                    }}
                  >
                    GH₵{price}
                  </span>
                  <span style={{ color: "#ef4444" }}>
                    GH₵{finalDiscountPrice}
                  </span>
                </>
              ) : (
                `GH₵${price}`
              )}
            </p>

            {sizes && sizes.length > 0 && (
              <div className="modal-sizes-container">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Select Size</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {sizes.map((s, idx) => (
                    <button
                      key={idx}
                      className={`size-chip-premium ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: size === s ? '1px solid var(--brand-red)' : '1px solid #e2e8f0',
                        background: size === s ? 'var(--brand-red)' : '#f8fafc',
                        color: size === s ? 'white' : 'var(--brand-red)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {extras && extras.length > 0 && (
              <div className="modal-extras-container">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Add Extras</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {extras.map((extra, idx) => {
                    const isSelected = selectedExtras.find(e => e.name === extra.name);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
                          } else {
                            setSelectedExtras([...selectedExtras, extra]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: isSelected ? '1px solid var(--brand-red)' : '1px solid #f1f5f9',
                          background: isSelected ? '#fff5f5' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isSelected ? 'var(--brand-red)' : '#fff',
                            borderColor: isSelected ? 'var(--brand-red)' : '#cbd5e1'
                          }}>
                            {isSelected && <X size={12} color="white" />}
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isSelected ? 'var(--brand-red)' : '#334155' }}>{extra.name}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--brand-red)' : '#64748b' }}>+ GH₵{extra.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="modal-qty-selector">
              <span>Quantity</span>
              <div className="modal-qty-controls">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="modal-qty-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="modal-qty-num">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="modal-qty-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className={`modal-add-btn ${justAdded ? "success" : ""}`}
                onClick={handleAdd}
              >
                {justAdded ? (
                  <>
                    <CheckCircle size={20} /> In Your Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Cart — GH₵{((parseFloat(finalDiscountPrice || price) + selectedExtras.reduce((s, e) => s + e.price, 0)) * qty).toFixed(2)}
                  </>
                )}
              </button>

              <div className="modal-social-grid">
                <button
                  onClick={() => {
                    const extrasStr = selectedExtras.map(e => `+${e.name}`).join(' ');
                    const unitTotal = parseFloat(finalDiscountPrice || price) + selectedExtras.reduce((s, e) => s + e.price, 0);
                    const msg = `Hi Sekina Special! I'd like to Quick Order this:\n\n*Meal:* ${name}\n*Size:* ${size || 'Standard'}\n${extrasStr ? `*Extras:* ${extrasStr}\n` : ""}*Quantity:* ${qty}\n*Total:* GH₵${(unitTotal * qty).toFixed(2)}\n\n*My Delivery Location:* [Please enter your location here]\n\nPlease confirm my order. Thank you! 😋🍛`;
                    window.open(`https://wa.me/233247508412?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="modal-social-btn wa"
                >
                  <MessageCircle size={18} /> Order Quick via WhatsApp
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href="https://www.instagram.com/sekinaspecial"
                    target="_blank"
                    rel="noreferrer"
                    className="modal-social-btn ig"
                    style={{ flex: 1 }}
                  >
                    <Instagram size={18} /> Instagram
                  </a>
                  <button
                    onClick={() => {
                      closeProduct();
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="modal-social-btn"
                    style={{ flex: 1 }}
                  >
                    Ask Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

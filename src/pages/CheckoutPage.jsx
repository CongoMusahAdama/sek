import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  Shield, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Ghost, 
  CheckCircle, 
  Upload,
  Copy
} from "lucide-react";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { API_URL } from "../utils/api";

const CheckoutPage = ({ addOrder, products }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    location: "",
  });
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0548164756");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="section-padding container center-text">
        <h2 className="serif">Your Order is Empty</h2>
        <p style={{ margin: "1rem 0 2rem" }}>
          You don't have any meals in your order to checkout.
        </p>
        <Link to="/shop" className="cta-button-premium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const form = new FormData();
    form.append("screenshot", file);

    try {
      const res = await fetch(`${API_URL}/upload/screenshot`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setScreenshotUrl(data.url);
        Swal.fire({
          title: "Screenshot Uploaded",
          text: "Payment proof received.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "var(--brand-red)",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      Swal.fire(
        "Upload Failed",
        err.message || "Image upload failed.",
        "error",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenshotUrl) {
      Swal.fire({
        title: "Payment Proof Required",
        text: "Please upload a screenshot of your payment to proceed.",
        icon: "warning",
        confirmButtonColor: "var(--brand-red)",
      });
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      customer: formData.customer,
      phone: formData.phone,
      location: formData.location,
      items: cartItems.map((i) => ({
        name: i.name,
        qty: i.qty,
        size: i.size || "M",
        selectedExtras: i.selectedExtras || []
      })),
      total: cartTotal,
      paymentScreenshot: screenshotUrl,
      paymentMethod: "Direct Payment",
      status: "Pending",
    };

    const response = await addOrder(orderData);
    if (response && response.success) {
      clearCart();
      const order = response.data;
      const itemsList = order.items.map(i => {
        const prod = products.find(p => p.name === i.name);
        const extrasStr = (i.selectedExtras || []).map(e => `+${e.name}`).join(' ');
        let imgPart = '';
        if (prod?.image) {
          const fullImgUrl = prod.image.startsWith('http') ? prod.image : `${window.location.origin}${prod.image}`;
          imgPart = `\n(Image: ${fullImgUrl})`;
        }
        return `• ${i.name} ${i.size ? `(${i.size})` : ""}${extrasStr ? ` [${extrasStr}]` : ""} x${i.qty}${imgPart}`;
      }).join('\n');
      const waMsg = `Hi Sekina Special! I just placed an order on your platform.\n\n*Order ID:* ${order.orderId || 'New'}\n*Customer:* ${order.customer}\n*Phone:* ${order.phone}\n*Location:* ${order.location}\n\n*Items:*\n${itemsList}\n\n*Total:* GH₵${order.total.toFixed(2)}\n\nPlease acknowledge my order. Thank you! 😋🍛`;
      const waUrl = `https://wa.me/233247508412?text=${encodeURIComponent(waMsg)}`;

      Swal.fire({
        title: "Order Received!",
        text: "Your order has been recorded. We will now forward your order to our kitchen via WhatsApp for final confirmation.",
        icon: "success",
        confirmButtonColor: "var(--brand-red)",
        confirmButtonText: "Continue to WhatsApp",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(waUrl, "_blank");
          navigate("/");
        }
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="checkout-page section-padding container">
      <div className="checkout-header">
        <h1 className="serif">Confirm Your Order</h1>
        <p className="text-brand-red">Sekina Special Fast Delivery</p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-form-column">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3 className="serif form-section-title">Customer Details</h3>
              <div className="form-group-premium">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ama Serwaa"
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                  className="checkout-input"
                />
              </div>
              <div className="form-group-premium">
                <label>WhatsApp Number</label>
                <input
                  type="text"
                  required
                  placeholder="+233 55 555 5555"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="checkout-input"
                />
              </div>
              <div className="form-group-premium">
                <label>Delivery Location</label>
                <input
                  type="text"
                  required
                  placeholder="Accra, Osu / Digital Address"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="checkout-input"
                />
              </div>
            </div>

            <div className="form-section payment-section checkout-card">
              <h3 className="serif form-section-title">Payment Instructions</h3>
              <div className="payment-instruction-box">
                <p className="instruction-text">
                  Please make a direct payment to the number below:
                </p>
                <div className="payment-number-card">
                  <div className="payment-number-info">
                    <p className="payment-method-label">MoMo / Direct Pay</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <p className="payment-number" style={{ margin: 0 }}>054 816 4756</p>
                      <button 
                        type="button"
                        onClick={copyToClipboard}
                        className={`copy-btn-minimal ${isCopied ? 'copied' : ''}`}
                        title="Copy Number"
                        style={{
                          background: isCopied ? 'var(--brand-red)' : '#f1f5f9',
                          color: isCopied ? 'white' : 'var(--brand-red)',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isCopied ? <><CheckCircle size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                      </button>
                    </div>
                    <p className="payment-acc-name">
                      Account Name: <b>Sekina Special</b>
                    </p>
                    <p className="payment-warning">
                      <AlertTriangle size={12} /> Confirm name before
                      authorising payment
                    </p>
                  </div>
                  <div className="payment-card-icon">
                    <Shield size={20} color="#16a34a" />
                  </div>
                </div>

                <div className="social-payment-support" style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                   <p className="instruction-text" style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                    Or make a direct WhatsApp order:
                  </p>
                  <a href={`https://wa.me/233247508412?text=${encodeURIComponent("Hi Sekina Special, I would like to make an order. My location is: [Please specify]")}`} target="_blank" rel="noreferrer" className="wa-payment-link flex items-center gap-2">
                    <MessageCircle size={18} /> <strong>024 750 8412</strong>
                  </a>
                </div>
              </div>

              <div className="screenshot-upload">
                <label className="upload-label">
                  Upload Payment Screenshot
                </label>
                <div
                  className="upload-placeholder"
                  onClick={() =>
                    !isUploading &&
                    document.getElementById("screenshot").click()
                  }
                  style={{ background: screenshotUrl ? "#f0fdf4" : "white" }}
                >
                  {isUploading ? (
                    <p>Uploading...</p>
                  ) : screenshotUrl ? (
                    <div className="upload-success-content">
                      <CheckCircle size={32} color="#16a34a" />
                      <p className="success-text">Proof Received</p>
                      <p className="change-text">Click to change</p>
                    </div>
                  ) : (
                    <div className="upload-empty-content">
                      <Upload size={32} color="#94a3b8" />
                      <p>Tap to upload receipt screenshot</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="screenshot"
                    hidden
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="cta-button-premium checkout-submit-btn"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {isSubmitting
                ? "Processing Your Order..."
                : "Confirm & Order via WhatsApp"}
            </button>
          </form>
        </div>

        <div className="order-summary-sidebar">
          <div className="glass shadowed order-summary-card">
            <h3 className="serif summary-title">Order Summary</h3>
            <div className="cart-items-preview">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-left">
                    <img src={item.image} className="summary-item-img" />
                    <div className="summary-item-info">
                      <p className="summary-item-name">{item.name}</p>
                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <p style={{ fontSize: '0.65rem', color: '#64748b' }}>
                          Extras: {item.selectedExtras.map(e => e.name).join(', ')}
                        </p>
                      )}
                      <p className="summary-item-qty">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="summary-item-price">
                    GH₵{((parseFloat(item.discountPrice || item.price) + (item.selectedExtras || []).reduce((s, e) => s + parseFloat(e.price), 0)) * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-pricing">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>GH₵{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Delivery comes at a cost</span>
              </div>
              <div className="summary-total-row">
                <span className="total-label">Total To Pay</span>
                <span className="total-amount">GH₵{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="guarantee-box">
              <CheckCircle size={20} color="#16a34a" />
              <div className="guarantee-text">
                <p className="guarantee-title">Delicious & Fresh Guaranteed</p>
                <p className="guarantee-desc">
                  Secure payment direct to Sekina Special.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-checkout-sticky-bar">
          <div className="sticky-bar-info">
            <p>Total to Pay</p>
            <h3>GH₵{cartTotal.toFixed(2)}</h3>
          </div>
          <button
            type="button"
            className="sticky-pay-btn"
            onClick={() => {
              const el = document.querySelector(".checkout-submit-btn");
              if (el)
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

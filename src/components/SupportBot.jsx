import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Headset, X, Phone, MessageCircle, ArrowRight } from "lucide-react";

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  if (location.pathname === "/auth" || location.pathname.startsWith("/admin"))
    return null;

  return (
    <div className={`support-bot-container ${isOpen ? "open" : ""}`}>
      <div className="support-window">
        <div className="support-header-premium">
          <div className="flex items-center gap-4">
            <div className="support-avatar-pulse">
              <Headset size={22} color="white" />
              <div className="online-indicator"></div>
            </div>
            <div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.1rem",
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                Sekina Special Support
              </h4>
              <p className="support-status">Online | Ready to take your order</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="close-support-btn"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="support-body-premium">
          <div className="support-msg-bubble">
            <p>
              Hello! Welcome to Sekina Special. Ready for some delicious Ghanaian meals today?
            </p>
          </div>

          <div className="support-action-grid">
            <a href="tel:+233548164756" className="support-action-card">
              <div className="action-icon-circle tel-bg">
                <Phone size={18} />
              </div>
              <div className="action-details">
                <span>Call Us Direct & Payment</span>
                <strong>+233 54 816 4756 (Sekina Special)</strong>
              </div>
              <ArrowRight size={14} className="action-arrow" />
            </a>

            <a
              href={`https://wa.me/233247508412?text=${encodeURIComponent("Hello! I would like to make an inquiry. My location is: [Please specify]")}`}
              target="_blank"
              rel="noreferrer"
              className="support-action-card"
            >
              <div className="action-icon-circle wa-bg">
                <MessageCircle size={18} />
              </div>
              <div className="action-details">
                <span>WhatsApp or Call</span>
                <strong>+233 24 750 8412</strong>
              </div>
              <ArrowRight size={14} className="action-arrow" />
            </a>
          </div>
        </div>

        <div className="support-footer-premium">
          <a
            href={`https://wa.me/233247508412?text=${encodeURIComponent("Hello Sekina Special! I want to make an order. My location is: [Please specify]")}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-full-btn"
          >
            <MessageCircle size={18} />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      </div>

      <button
        className="support-trigger-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <div className="trigger-label">
            <span className="pulse-dot"></span>
            Chat with us
          </div>
        )}
      </button>
    </div>
  );
};

export default SupportBot;

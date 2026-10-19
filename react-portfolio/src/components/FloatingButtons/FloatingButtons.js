import React from 'react';
import { motion } from 'framer-motion';
import './FloatingButtons.css';

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp Floating Action Button */}
      <motion.div
        className="floating-btn-wrapper whatsapp-wrapper"
        initial={{ scale: 0, opacity: 0, x: -60 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
      >
        <div className="floating-tooltip whatsapp-tooltip">
          <span className="tooltip-title">WhatsApp</span>
          <span className="tooltip-sub">Chat with Pritish</span>
        </div>

        <a
          href="https://wa.me/918605720415"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <div className="btn-ambient-pulse whatsapp-pulse"></div>
          <div className="btn-icon-box">
            <i className="fab fa-whatsapp"></i>
          </div>
          <span className="status-beacon whatsapp-beacon">
            <span className="beacon-ping"></span>
            <span className="beacon-dot"></span>
          </span>
        </a>
      </motion.div>

      {/* Email Floating Action Button */}
      <motion.div
        className="floating-btn-wrapper email-wrapper"
        initial={{ scale: 0, opacity: 0, x: 60 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 18 }}
      >
        <div className="floating-tooltip email-tooltip">
          <span className="tooltip-title">Direct Email</span>
          <span className="tooltip-sub">Send a message</span>
        </div>

        <a
          href="mailto:pritishjadhav2006@gmail.com"
          className="floating-action-btn email-btn"
          aria-label="Send Email"
        >
          <div className="btn-ambient-pulse email-pulse"></div>
          <div className="btn-icon-box">
            <i className="fas fa-envelope"></i>
          </div>
          <span className="status-beacon email-beacon">
            <span className="beacon-ping"></span>
            <span className="beacon-dot"></span>
          </span>
        </a>
      </motion.div>
    </>
  );
};

export default FloatingButtons;

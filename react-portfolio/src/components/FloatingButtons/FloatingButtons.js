import React from 'react';
import { motion } from 'framer-motion';
import './FloatingButtons.css';

const FloatingButtons = () => {
  return (
    <>
      <motion.div
        className="whatsapp-float cyber-node-container"
        initial={{ scale: 0, x: -100 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="node-rings-wrapper">
          <div className="orbital-ring h-ring"></div>
          <div className="orbital-ring v-ring"></div>
          <div className="node-glare"></div>
        </div>
        
        <div className="node-core">
          <a
            href="https://wa.me/918605720415"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        
        <div className="node-label">
          <span className="label-code">COMMS_LINK:</span>
          <span className="label-text">WHATSAPP</span>
        </div>
      </motion.div>

      <motion.div
        className="email-float cyber-node-container"
        initial={{ scale: 0, x: 100 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="node-rings-wrapper">
          <div className="orbital-ring h-ring"></div>
          <div className="orbital-ring v-ring"></div>
          <div className="node-glare"></div>
        </div>

        <div className="node-core">
          <a
            href="mailto:pritishjadhav2006@gmail.com"
            title="Send Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>

        <div className="node-label">
          <span className="label-code">COMMS_LINK:</span>
          <span className="label-text">EMAIL_REACH</span>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingButtons;

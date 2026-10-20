import React from 'react';
import { motion } from 'framer-motion';
import { useVirtualMouse } from './VirtualMouseContext';
import './VirtualMouseNavButton.css';

const VirtualMouseNavButton = ({ className = '' }) => {
  const { isVirtualMouseActive, toggleVirtualMouse } = useVirtualMouse();

  return (
    <motion.button
      type="button"
      className={`virtual-mouse-nav-btn ${isVirtualMouseActive ? 'active' : ''} ${className}`}
      onClick={toggleVirtualMouse}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isVirtualMouseActive ? "Disable Virtual Trackpad Mode" : "Enable Mobile Virtual Trackpad Mode"}
      aria-pressed={isVirtualMouseActive}
      title={isVirtualMouseActive ? "Close Virtual Trackpad" : "Open Mobile Virtual Trackpad"}
    >
      {/* Lucide-Style MousePointer2 Vector Icon */}
      <svg
        className="mouse-pointer-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
      </svg>

      {/* Active state indicator dot */}
      <span className="nav-btn-status-beacon">
        <span className="beacon-ping"></span>
        <span className="beacon-core"></span>
      </span>

      {/* Tooltip for desktop / touch hover */}
      <span className="nav-btn-tooltip">
        {isVirtualMouseActive ? 'Close Trackpad' : 'Virtual Trackpad'}
      </span>
    </motion.button>
  );
};

export default VirtualMouseNavButton;

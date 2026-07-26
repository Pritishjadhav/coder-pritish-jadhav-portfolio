import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Motion values for reactive positioning
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName === 'A' || 
                         target.tagName === 'BUTTON' ||
                         target.closest('button') ||
                         target.closest('a');
      
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="custom-cursor-wrapper">
      {/* 1. Leading Glow Aura */}
      <motion.div
        className="cursor-aura"
        style={{
          left: mouseX,
          top: mouseY,
          scale: isPointer ? 2.5 : 1,
        }}
      />

      {/* 2. Main Trailing Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          left: smoothX,
          top: smoothY,
          scale: isPointer ? 1.5 : 1,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" }
        }}
      />

      {/* 3. Central Dot (Precise) */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
      />

      {/* 4. Crazy Trailing Particles/Ghosts */}
      <motion.div
        className="cursor-trail trail-1"
        style={{
          left: useSpring(mouseX, { damping: 40, stiffness: 150 }),
          top: useSpring(mouseY, { damping: 40, stiffness: 150 }),
        }}
      />
      <motion.div
        className="cursor-trail trail-2"
        style={{
          left: useSpring(mouseX, { damping: 60, stiffness: 100 }),
          top: useSpring(mouseY, { damping: 60, stiffness: 100 }),
        }}
      />
    </div>
  );
};

export default Cursor;

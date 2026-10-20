import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualMouse } from './VirtualMouseContext';
import './VirtualTrackpad.css';

const VirtualTrackpad = () => {
  const {
    isVirtualMouseActive,
    closeVirtualMouse,
    sensitivity,
    setSensitivity
  } = useVirtualMouse();

  // Internal cursor position in viewport coordinates (px)
  const cursorPosRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 200
  });

  const cursorElemRef = useRef(null);
  const rippleElemRef = useRef(null);
  const padSurfaceRef = useRef(null);
  const lastHoveredElementRef = useRef(null);
  const rafIdRef = useRef(null);

  // Touch tracking references
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startTime: 0,
    hasMoved: false,
    isTwoFinger: false,
    lastTwoFingerY: 0,
    isScrollZone: false
  });

  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState(null); // visual dot where user touches pad

  // Keep cursor within viewport bounds
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  // High performance direct DOM cursor position update (avoids React re-renders during high-speed drag)
  const updateCursorDOM = useCallback((x, y) => {
    if (cursorElemRef.current) {
      cursorElemRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, []);

  // Center cursor on initial open
  useEffect(() => {
    if (isVirtualMouseActive) {
      const initialX = Math.round(window.innerWidth / 2);
      const initialY = Math.round(window.innerHeight / 3);
      cursorPosRef.current = { x: initialX, y: initialY };
      // Small timeout to allow DOM node to mount
      setTimeout(() => {
        updateCursorDOM(initialX, initialY);
        updateHoverAt(initialX, initialY);
      }, 50);
    } else {
      // Clean up any lingering hover styles
      if (lastHoveredElementRef.current) {
        lastHoveredElementRef.current.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
        lastHoveredElementRef.current.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        lastHoveredElementRef.current = null;
      }
    }
  }, [isVirtualMouseActive, updateCursorDOM]);

  // Simulate mouse hover & detect clickable elements under cursor tip
  const updateHoverAt = (x, y) => {
    // Hide cursor from elementFromPoint via pointer-events: none
    const target = document.elementFromPoint(x, y);

    if (target !== lastHoveredElementRef.current) {
      if (lastHoveredElementRef.current) {
        lastHoveredElementRef.current.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
        lastHoveredElementRef.current.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
      }
      if (target) {
        target.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
        target.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        target.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      }
      lastHoveredElementRef.current = target;
    }

    if (target) {
      const isClickable = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
      setIsHoveringClickable(isClickable);
    } else {
      setIsHoveringClickable(false);
    }
  };

  // Visual click ripple at cursor position
  const triggerClickRipple = (x, y) => {
    setIsClicking(true);
    if (rippleElemRef.current) {
      rippleElemRef.current.style.left = `${x}px`;
      rippleElemRef.current.style.top = `${y}px`;
      rippleElemRef.current.classList.remove('animate');
      // Trigger reflow to restart animation
      void rippleElemRef.current.offsetWidth;
      rippleElemRef.current.classList.add('animate');
    }
    setTimeout(() => setIsClicking(false), 250);
  };

  // Full browser-compatible click execution on real website element
  const executeVirtualClick = useCallback((x, y, buttonType = 0) => {
    // 1. Visual feedback at cursor tip
    triggerClickRipple(x, y);

    // 2. Locate target element
    const target = document.elementFromPoint(x, y);
    if (!target) return;

    // 3. Dispatch native Pointer & Mouse events
    const eventInit = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y,
      button: buttonType,
      buttons: buttonType === 0 ? 1 : 2
    };

    target.dispatchEvent(new PointerEvent('pointerdown', eventInit));
    target.dispatchEvent(new MouseEvent('mousedown', eventInit));
    target.dispatchEvent(new PointerEvent('pointerup', eventInit));
    target.dispatchEvent(new MouseEvent('mouseup', eventInit));
    target.dispatchEvent(new MouseEvent('click', eventInit));

    // 4. Input & Textarea focus
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      target.focus();
    } else if (target.tagName === 'SELECT') {
      target.focus();
    }

    // 5. Native Link handling (anchors & hrefs)
    const link = target.closest('a');
    if (link && link.href) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetSection = document.getElementById(href.slice(1));
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (link !== target) {
        link.click();
      }
    } else {
      // 6. Buttons
      const button = target.closest('button, [role="button"]');
      if (button && button !== target) {
        button.click();
      }
    }
  }, []);

  // Attach non-passive touch listeners to trackpad surface to prevent page scroll while dragging
  useEffect(() => {
    const pad = padSurfaceRef.current;
    if (!pad || !isVirtualMouseActive) return;

    const handleTouchStart = (e) => {
      // Prevent default page scroll on pad
      e.preventDefault();
      const rect = pad.getBoundingClientRect();

      if (e.touches.length === 2) {
        // Two-finger scroll start
        touchStateRef.current.isTwoFinger = true;
        touchStateRef.current.lastTwoFingerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        return;
      }

      const touch = e.touches[0];
      const relX = touch.clientX - rect.left;
      const isRightEdgeScroll = relX > rect.width * 0.82; // Right 18% is dedicated 1-finger scroll strip

      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        lastX: touch.clientX,
        lastY: touch.clientY,
        startTime: Date.now(),
        hasMoved: false,
        isTwoFinger: false,
        lastTwoFingerY: 0,
        isScrollZone: isRightEdgeScroll
      };

      // Show small tactile touch dot on the pad surface
      setTouchFeedback({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const state = touchStateRef.current;
      const rect = pad.getBoundingClientRect();

      // Case A: 2-Finger Page Scrolling
      if (e.touches.length >= 2) {
        const currentAvgY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const deltaY = currentAvgY - (state.lastTwoFingerY || currentAvgY);
        state.lastTwoFingerY = currentAvgY;
        window.scrollBy({ top: -deltaY * 1.8, behavior: 'instant' });
        return;
      }

      // Case B: 1-Finger
      const touch = e.touches[0];

      // Update tactile touch dot on trackpad
      setTouchFeedback({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });

      // Case B1: Right Edge 1-Finger Scroll Zone
      if (state.isScrollZone) {
        const deltaY = touch.clientY - state.lastY;
        state.lastY = touch.clientY;
        window.scrollBy({ top: deltaY * 2.2, behavior: 'instant' });
        return;
      }

      // Case B2: Normal Pointer Movement
      const deltaX = (touch.clientX - state.lastX) * sensitivity;
      const deltaY = (touch.clientY - state.lastY) * sensitivity;

      if (Math.abs(touch.clientX - state.startX) > 4 || Math.abs(touch.clientY - state.startY) > 4) {
        state.hasMoved = true;
      }

      state.lastX = touch.clientX;
      state.lastY = touch.clientY;

      // Update cursor position with viewport clamping
      const newX = clamp(cursorPosRef.current.x + deltaX, 4, window.innerWidth - 6);
      const newY = clamp(cursorPosRef.current.y + deltaY, 4, window.innerHeight - 6);
      cursorPosRef.current = { x: newX, y: newY };

      // High-frequency RAF update
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        updateCursorDOM(newX, newY);
        updateHoverAt(newX, newY);
      });
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      setTouchFeedback(null);
      const state = touchStateRef.current;

      // If user did a quick tap without significant drag -> Left Click!
      if (!state.isTwoFinger && !state.isScrollZone) {
        const duration = Date.now() - state.startTime;
        const totalDistance = Math.hypot(
          state.lastX - state.startX,
          state.lastY - state.startY
        );

        if (!state.hasMoved || (totalDistance < 8 && duration < 320)) {
          executeVirtualClick(cursorPosRef.current.x, cursorPosRef.current.y, 0);
        }
      }

      touchStateRef.current.isTwoFinger = false;
      touchStateRef.current.isScrollZone = false;
    };

    const handleTouchCancel = () => {
      setTouchFeedback(null);
      touchStateRef.current.isTwoFinger = false;
      touchStateRef.current.isScrollZone = false;
    };

    pad.addEventListener('touchstart', handleTouchStart, { passive: false });
    pad.addEventListener('touchmove', handleTouchMove, { passive: false });
    pad.addEventListener('touchend', handleTouchEnd, { passive: false });
    pad.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      pad.removeEventListener('touchstart', handleTouchStart);
      pad.removeEventListener('touchmove', handleTouchMove);
      pad.removeEventListener('touchend', handleTouchEnd);
      pad.removeEventListener('touchcancel', handleTouchCancel);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isVirtualMouseActive, sensitivity, updateCursorDOM, executeVirtualClick]);

  // Sensitivity cycle: 1.0x -> 1.5x -> 2.0x
  const cycleSensitivity = () => {
    setSensitivity((prev) => {
      if (prev <= 1.1) return 1.5;
      if (prev <= 1.6) return 2.0;
      return 1.0;
    });
  };

  if (!isVirtualMouseActive) return null;

  return (
    <>
      {/* ============================================================
          1. INDEPENDENT VIRTUAL MOUSE CURSOR (POINTER)
          ============================================================ */}
      <div
        ref={cursorElemRef}
        className={`virtual-mouse-cursor ${isHoveringClickable ? 'is-clickable' : ''} ${
          isClicking ? 'is-clicking' : ''
        }`}
        style={{
          transform: `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`
        }}
        aria-hidden="true"
      >
        {/* Modern Laptop Arrow Pointer SVG */}
        <div className="cursor-arrow-body">
          <svg
            className="cursor-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.07 20L12.58 12.61L20 10.1L3 3Z"
              fill="#00f2fe"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <div className="cursor-hotspot-dot"></div>
          {isHoveringClickable && <div className="cursor-target-ring"></div>}
        </div>
      </div>

      {/* Click Impact Ripple Animation */}
      <div ref={rippleElemRef} className="virtual-cursor-ripple" aria-hidden="true" />

      {/* ============================================================
          2. VIRTUAL TRACKPAD FIXED BOTTOM PANEL
          ============================================================ */}
      <AnimatePresence>
        <motion.div
          className="virtual-trackpad-container"
          initial={{ y: 260, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 260, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          role="region"
          aria-label="Virtual Mobile Trackpad"
        >
          <div className="virtual-trackpad-card">
            {/* Top Control Header */}
            <div className="trackpad-top-bar">
              <div className="trackpad-title-wrap">
                <span className="trackpad-live-dot"></span>
                <span className="trackpad-title">TRACKPAD MODE</span>
              </div>

              {/* Mode Controls */}
              <div className="trackpad-header-actions">
                <button
                  type="button"
                  className="trackpad-sens-btn"
                  onClick={cycleSensitivity}
                  title="Toggle Cursor Speed"
                  aria-label={`Cursor sensitivity ${sensitivity}x`}
                >
                  <i className="fas fa-gauge-high"></i>
                  <span>{sensitivity}x</span>
                </button>

                <div className="trackpad-gesture-hint" title="Scroll gesture guide">
                  <i className="fas fa-hand-peace"></i>
                  <span>2-Finger Scroll</span>
                </div>

                <button
                  type="button"
                  className="trackpad-close-btn"
                  onClick={closeVirtualMouse}
                  title="Hide Trackpad"
                  aria-label="Close Trackpad"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Main Interactive Touch Surface */}
            <div
              ref={padSurfaceRef}
              className="trackpad-touch-surface"
              role="application"
              aria-label="Drag finger to move pointer, tap to click"
            >
              {/* Subtle Cyber Grid Texture */}
              <div className="trackpad-cyber-texture"></div>

              {/* Center crosshair watermark */}
              <div className="trackpad-center-mark">
                <i className="fas fa-arrow-pointer mark-icon"></i>
                <span className="mark-label">DRAG TO MOVE • TAP TO CLICK</span>
              </div>

              {/* Right Edge 1-Finger Scroll Strip */}
              <div className="trackpad-edge-scroll-strip" aria-hidden="true">
                <i className="fas fa-chevron-up scroll-arrow"></i>
                <span className="scroll-label">SCROLL</span>
                <i className="fas fa-chevron-down scroll-arrow"></i>
              </div>

              {/* Visual touch ripple underneath user's finger */}
              {touchFeedback && (
                <div
                  className="trackpad-touch-dot"
                  style={{
                    left: `${touchFeedback.x}px`,
                    top: `${touchFeedback.y}px`
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Bottom Laptop Trackpad Buttons (Left Click & Right Click) */}
            <div className="trackpad-bottom-buttons">
              <motion.button
                type="button"
                className="trackpad-btn left-click-btn"
                onClick={() =>
                  executeVirtualClick(cursorPosRef.current.x, cursorPosRef.current.y, 0)
                }
                whileTap={{ scale: 0.97 }}
                aria-label="Primary Left Click at cursor position"
              >
                <i className="fas fa-computer-mouse"></i>
                <span>LEFT CLICK</span>
              </motion.button>

              <div className="trackpad-btn-divider"></div>

              <motion.button
                type="button"
                className="trackpad-btn right-click-btn"
                onClick={() =>
                  executeVirtualClick(cursorPosRef.current.x, cursorPosRef.current.y, 2)
                }
                whileTap={{ scale: 0.97 }}
                aria-label="Secondary Right Click at cursor position"
              >
                <span>RIGHT CLICK</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default VirtualTrackpad;

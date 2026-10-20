import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const VirtualMouseContext = createContext(null);

export const VirtualMouseProvider = ({ children }) => {
  const [isVirtualMouseActive, setIsVirtualMouseActive] = useState(false);
  const [sensitivity, setSensitivity] = useState(1.25); // Default smooth sensitivity

  // Check if secure test mode or examination lockdown is active
  const isSecureTestMode = useCallback(() => {
    return (
      document.body.classList.contains('secure-test-mode') ||
      document.body.classList.contains('exam-lockdown') ||
      Boolean(window.__DISABLE_VIRTUAL_MOUSE__)
    );
  }, []);

  const openVirtualMouse = useCallback(() => {
    if (isSecureTestMode()) return;
    setIsVirtualMouseActive(true);
  }, [isSecureTestMode]);

  const closeVirtualMouse = useCallback(() => {
    setIsVirtualMouseActive(false);
  }, []);

  const toggleVirtualMouse = useCallback(() => {
    if (isSecureTestMode()) return;
    setIsVirtualMouseActive((prev) => !prev);
  }, [isSecureTestMode]);

  // If secure test mode is ever activated dynamically, automatically turn off virtual trackpad
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (isSecureTestMode() && isVirtualMouseActive) {
        setIsVirtualMouseActive(false);
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isSecureTestMode, isVirtualMouseActive]);

  // Clean keyboard shortcut (Escape closes virtual trackpad)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVirtualMouseActive) {
        setIsVirtualMouseActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVirtualMouseActive]);

  return (
    <VirtualMouseContext.Provider
      value={{
        isVirtualMouseActive,
        openVirtualMouse,
        closeVirtualMouse,
        toggleVirtualMouse,
        sensitivity,
        setSensitivity
      }}
    >
      {children}
    </VirtualMouseContext.Provider>
  );
};

export const useVirtualMouse = () => {
  const context = useContext(VirtualMouseContext);
  if (!context) {
    throw new Error('useVirtualMouse must be used within a VirtualMouseProvider');
  }
  return context;
};

export default VirtualMouseContext;

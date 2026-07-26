import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // Close menu on click
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const sidebarVariants = {
    hidden: { 
      x: '-100%', 
      skewX: 10,
      opacity: 0,
      rotateY: -20
    },
    visible: { 
      x: 0, 
      skewX: 0,
      opacity: 1, 
      rotateY: 0,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 15,
        mass: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { 
      x: '-100%', 
      opacity: 0, 
      skewX: -10,
      transition: { duration: 0.4, ease: "anticipate" } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, rotateX: 45 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateX: 0,
      transition: { 
        type: 'spring', 
        stiffness: 200, 
        damping: 15
      } 
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <div className="container">
        <motion.div
          className="logo-wrapper"
          initial={{ opacity: 0, x: -50, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          onClick={() => scrollToSection('home')}
        >
          <div className="logo">PJ</div>
          <div className="logo-text">
            <span className="logo-name">
              <span className="name-part-1">PRITISH</span>
              <span className="name-part-2">VERSE</span>
            </span>
            <span className="logo-dev-tag">DEVELOPER</span>
          </div>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                className="mobile-backdrop" 
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex: 1999 }}
              />
              <motion.ul
                className="nav-links mobile-sidebar"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="sidebar-header">
                  <span className="logo-name">PRITISH</span>
                </div>
                {['home', 'about', 'experience', 'education', 'skills', 'contact'].map((item) => (
                  <motion.li 
                    key={item} 
                    variants={itemVariants}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a
                      href={`#${item}`}
                      className={activeSection === item ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item);
                      }}
                    >
                      <span className="nav-label">{item.toUpperCase()}</span>
                    </a>
                  </motion.li>
                ))}
                <div className="sidebar-footer">
                  <p>© 2026 PRITISH VERSE</p>
                </div>
              </motion.ul>
            </>
          )}
        </AnimatePresence>

        <ul className="nav-links desktop-only">
          {['home', 'about', 'experience', 'education', 'skills', 'contact'].map((item) => (
            <motion.li key={item} variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a
                href={`#${item}`}
                className={activeSection === item ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.div 
                    layoutId="active-beam"
                    className="active-laser-beam"
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          initial={{ opacity: 0, rotate: 180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-backdrop" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav >
  );
};

export default Navbar;

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Hero.css';

const ROLES = ['Full Stack Developer', 'Data Science Architect', 'DBA Expert', 'AI Engineer'];

const Hero = () => {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);
  const tiltX = useTransform(smoothY, [-0.5, 0.5], ['8deg', '-8deg']);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], ['-8deg', '8deg']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && displayedText.length < current.length) {
      timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length + 1)), 80);
    } else if (!isDeleting && displayedText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length - 1)), 45);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="home" className="ultra-hero-section" ref={containerRef}>

      {/* Animated Background */}
      <motion.div className="hero-cyber-bg" style={{ x: bgX, y: bgY }}>
        <div className="grid-floor"></div>
        <div className="noise-overlay"></div>
        <div className="bg-glow glow-purple"></div>
        <div className="bg-glow glow-cyan"></div>
        <div className="bg-glow glow-pink"></div>
      </motion.div>

      {/* Floating particles */}
      <div className="particles-container" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}></div>
        ))}
      </div>

      <div className="hero-inner-wrap">

        {/* ====== LEFT: TEXT CONTENT ====== */}
        <div className="hero-text-col">

          {/* Status Badge */}
          <motion.div className="hero-status-badge"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="live-dot"></span>
            <span>AVAILABLE FOR HIRE</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div className="hero-heading-block"
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, type: 'spring', bounce: 0.3 }}>
            <p className="greeting-line">Hello, I'm</p>
            <h1 className="hero-name">
              <span className="name-top">Mr. Pritish</span>
              <span className="name-bottom-wrap">
                <span className="name-bottom">Jadhav</span>
                <span className="name-underline"></span>
              </span>
            </h1>
          </motion.div>

          {/* Typewriter Role */}
          <motion.div className="typewriter-block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}>
            <span className="tw-prefix">{'<'}</span>
            <span className="tw-text">{displayedText}</span>
            <span className="tw-cursor">|</span>
            <span className="tw-suffix">{'/>'}</span>
          </motion.div>

          {/* Description */}
          <motion.p className="hero-description"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}>
            Building scalable digital experiences by combining modern web technologies,
            data-driven systems, and robust database architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-cta-row"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}>
            <a href="#contact" className="btn-primary-hero">
              <span>Initialize Contact</span>
              <i className="fas fa-satellite-dish"></i>
              <div className="btn-shine"></div>
            </a>
            <a href="#about" className="btn-secondary-hero">
              <span>View Core Logs</span>
              <i className="fas fa-terminal"></i>
            </a>
          </motion.div>

          {/* Social Row */}
          <motion.div className="hero-social-row"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}>
            <span className="social-label">CONNECT</span>
            <div className="social-line"></div>
            <a href="https://www.linkedin.com/in/pritish-jadhav-205141339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/pritishjadhav" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className="social-icon-btn">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://x.com/Pritish2006" target="_blank" rel="noopener noreferrer"
              aria-label="Twitter / X" className="social-icon-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/jadhav_pritish_26?igsh=aDNmY2ZzdGk4aTVz"
              target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
              <i className="fab fa-instagram"></i>
            </a>
          </motion.div>

        </div>

        {/* ====== RIGHT: PROFILE VISUAL ====== */}
        <div className="hero-visual-col">

          <motion.div className="profile-3d-wrap"
            style={{ rotateX: tiltX, rotateY: tiltY }}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, type: 'spring', bounce: 0.35 }}>

            {/* Glowing aura rings */}
            <div className="aura-ring aura-1"></div>
            <div className="aura-ring aura-2"></div>
            <div className="aura-ring aura-3"></div>

            {/* Orbiting dot */}
            <div className="orbit-ring">
              <div className="orbit-dot"></div>
            </div>

            {/* Photo Card */}
            <div className="photo-card">
              <div className="photo-card-border-glow"></div>
              <img src="/images/pritish-photo.jpg" alt="Pritish Jadhav - Full Stack Developer" className="profile-photo" />
              <div className="photo-scan-line"></div>
              <div className="photo-vignette"></div>

              {/* Corner brackets */}
              <div className="cb tl"></div>
              <div className="cb tr"></div>
              <div className="cb bl"></div>
              <div className="cb br"></div>

              {/* Inner label */}
              <div className="photo-label">
                <span className="dot-green"></span>
                PRITISH.JAV — ONLINE
              </div>
            </div>

            {/* Floating badge 1 */}
            <motion.div className="float-badge badge-tl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="badge-icon"><i className="fas fa-code"></i></div>
              <div className="badge-info">
                <div className="badge-main">FULL STACK</div>
                <div className="badge-sub">Developer</div>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div className="float-badge badge-br"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
              <div className="badge-icon badge-icon-cyan"><i className="fas fa-brain"></i></div>
              <div className="badge-info">
                <div className="badge-main">AI + DATA</div>
                <div className="badge-sub">Architecture</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ====== STATS BAR ====== */}
      <motion.div className="hero-stats-bar"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}>
        <div className="stat-item">
          <span className="stat-val">10<span className="stat-plus">+</span></span>
          <span className="stat-lbl">Projects</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-val">2<span className="stat-plus">+</span></span>
          <span className="stat-lbl">Years Exp.</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-val">5<span className="stat-plus">+</span></span>
          <span className="stat-lbl">Tech Domains</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-val">100<span className="stat-plus">%</span></span>
          <span className="stat-lbl">Dedication</span>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;

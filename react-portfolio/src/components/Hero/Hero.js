import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  // Custom Mouse Tracking for Parallax Background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Map mouse movement to subtle background shifting
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);

  // Floating Profile 3D Tilt
  const tiltX = useTransform(smoothY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="ultra-hero-section" ref={containerRef}>

      {/* Interactive Parallax Background (Subtle Grid) */}
      <motion.div className="hero-cyber-bg" style={{ x: bgX, y: bgY }}>
        <div className="grid-floor"></div>
        <div className="bg-glow pink-glow"></div>
        <div className="bg-glow blue-glow"></div>
      </motion.div>

      <div className="container relative z-10">

        <div className="hero-mega-layout">

          {/* Left Column: Text & CTA */}
          <div className="hero-text-col">

            <motion.div
              className="hero-badge-cyber"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <span className="live-dot"></span>
              <span className="badge-text">SYSTEM ONLINE / INITIALIZED</span>
            </motion.div>

            <motion.h1
              className="hero-massive-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <div className="greeting-text">Hello, I am</div>
              <div className="name-glitch-wrapper">
                <span className="name-gradient">Mr. PRITISH JADHAV</span>
              </div>
            </motion.h1>

            <motion.div
              className="hero-roles-cyber"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            >
              <span className="cyber-role">Full Stack Developer</span>
              <span className="role-divider">///</span>
              <span className="cyber-role">Data Science Architect</span>
              <span className="role-divider">///</span>
              <span className="cyber-role">DBA Expert</span>
            </motion.div>

            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Engineering seamless digital experiences. Transforming complex problems into elegant, highly scalable web solutions powered by advanced database architectures.
            </motion.p>

            <motion.div
              className="hero-action-matrix"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            >
              <a href="#contact" className="cyber-btn primary-cyber">
                <span className="btn-text">INITIALIZE CONTACT</span>
                <i className="fas fa-satellite-dish"></i>
              </a>
              <a href="#about" className="cyber-btn secondary-cyber">
                <span className="btn-text">VIEW CORE LOGS</span>
                <i className="fas fa-terminal"></i>
              </a>
            </motion.div>
            <motion.div
              className="hero-social-reactor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="social-connector"></div>
              <a href="https://www.linkedin.com/in/pritish-jadhav-205141339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in text-blue-500"></i>
              </a>
              <a href="https://github.com/pritishjadhav" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github text-white"></i>
              </a>
              <a href="https://x.com/Pritish2006" target="_blank" rel="noopener noreferrer" title="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: '#60a5fa' }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.instagram.com/jadhav_pritish_26?igsh=aDNmY2ZzdGk4aTVz" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram text-pink-500"></i>
              </a>
            </motion.div>

          </div>

          {/* Right Column: 3D Profile & Stats Interface */}
          <div className="hero-visual-col">
            <motion.div
              className="profile-cyber-container"
              style={{ rotateX: tiltX, rotateY: tiltY }}
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            >
              {/* Background Aurora Glow */}
              <div className="profile-aurora"></div>

              {/* Rotating Holographic Rings - More Depth */}
              <div className="holo-ring ring-1"></div>
              <div className="holo-ring ring-2"></div>
              <div className="holo-ring ring-3"></div>
              <div className="holo-ring ring-4"></div>
              <div className="holo-ring ring-5"></div>

              {/* Subatomic Particle Orbits (Protons/Neutrons) */}
              <div className="particle-orbit orbit-v">
                <div className="particle-core proton"></div>
              </div>
              <div className="particle-orbit orbit-h">
                <div className="particle-core neutron"></div>
              </div>
              <div className="particle-orbit orbit-d1">
                <div className="particle-core proton"></div>
              </div>
              <div className="particle-orbit orbit-d2">
                <div className="particle-core neutron"></div>
              </div>

              {/* 3D Decorative Bits */}
              <div className="cyber-3d-bit bit-1"></div>
              <div className="cyber-3d-bit bit-2"></div>
              <div className="cyber-3d-bit bit-3"></div>
              <div className="cyber-3d-bit bit-4"></div>

              {/* Main Photo Frame */}
              <div className="cyber-photo-frame">
                <div className="frame-internal-glow"></div>
                <img src="/images/pritish-photo.jpg" alt="Pritish Jadhav" className="profile-img-main" />
                
                {/* Data Overlays */}
                <div className="photo-glitch-overlay"></div>
                <div className="photo-scan-bar"></div>
                
                {/* Corner Accents */}
                <div className="corner-bracket top-left"></div>
                <div className="corner-bracket top-right"></div>
                <div className="corner-bracket bottom-left"></div>
                <div className="corner-bracket bottom-right"></div>
              </div>

              {/* Floating Data Widgets */}
              <motion.div 
                className="data-chip chip-left glass-panel"
                animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="chip-code">AI_MODEL_V2</div>
                <div className="chip-status">TRAINING</div>
              </motion.div>

              <motion.div 
                className="data-chip chip-right glass-panel"
                animate={{ x: [0, 10, 0], y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
              >
                <div className="chip-code">SYS_ARCH</div>
                <div className="chip-stat">OPTIMAL</div>
              </motion.div>

            </motion.div>

            {/* NEW: Stats Grid (Moved under Profile) */}
            <motion.div 
              className="hero-stats-grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
            >
              <div className="stat-card glass-panel">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Deployed</span>
              </div>
              <div className="stat-card glass-panel">
                <span className="stat-number">1+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card glass-panel">
                <span className="stat-number">5+</span>
                <span className="stat-label">Tech Stacks</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

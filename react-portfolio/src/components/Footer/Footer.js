import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  // Parallax effect for the massive background text
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 0.1]);

  return (
    <footer className="ultra-footer" ref={footerRef}>

      {/* Animated Glowing Divider */}
      <div className="footer-glow-line"></div>

      {/* Massive Parallax Background Name */}
      <motion.div
        className="footer-massive-text"
        style={{ y: textY, opacity }}
      >
        PRITISH
      </motion.div>

      <div className="container relative z-10">

        <div className="footer-grid-insane">

          {/* Brand & Identity */}
          <div className="footer-brand-col">
            <motion.div
              className="footer-glitch-logo"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="logo-hex">
                <span>PJ</span>
              </div>
              <div className="brand-name">
                <span className="brand-p1">PRITISH</span>
                <span className="brand-p2">VERSE</span>
              </div>
            </motion.div>
            <p className="footer-tagline">
              Engineering digital experiences that push the boundaries of web technology.
            </p>
            <div className="footer-status">
              <span className="status-blinker"></span>
              All Systems Operational
            </div>
          </div>

          {/* Epic Fast Links */}
          <div className="footer-links-col">
            <h3 className="col-title">Navigation</h3>
            <div className="magnetic-nav-links">
              {['Home', 'About', 'Experience', 'Education', 'Skills'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="cyber-link"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, color: '#a855f7' }}
                >
                  <span className="link-arrow">›</span> {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Radar */}
          <div className="footer-contact-col">
            <h3 className="col-title">Comms Interface</h3>
            <ul className="comms-list">
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                className="comms-item"
              >
                <i className="fas fa-envelope neon-icon purple"></i>
                <a href="mailto:pritishjadhav2006@gmail.com">pritishjadhav2006@gmail.com</a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                className="comms-item"
              >
                <i className="fas fa-phone-alt neon-icon emerald"></i>
                <a href="tel:+918605720415">+91 86057 20415</a>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                className="comms-item"
              >
                <i className="fas fa-map-marker-alt neon-icon blue"></i>
                <span>Pune, Maharashtra, India</span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright">
            &copy; {new Date().getFullYear()} PritishVerse. Engineered by Pritish Jadhav.
          </div>

          <div className="social-reactor">
            <a href="https://www.linkedin.com/in/pritish-jadhav-205141339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="reactor-node" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/pritishjadhav" target="_blank" rel="noopener noreferrer" className="reactor-node" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://x.com/Pritish2006" target="_blank" rel="noopener noreferrer" className="reactor-node" title="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/jadhav_pritish_26?igsh=aDNmY2ZzdGk4aTVz" target="_blank" rel="noopener noreferrer" className="reactor-node" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

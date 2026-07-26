import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="about" className="insane-about-section" ref={containerRef}>

      {/* Cyber Grid Background */}
      <div className="about-cyber-grid"></div>

      <div className="container relative z-10">

        <div className="about-mega-grid">

          {/* Left Side: Animated Hologram/Avatar Portal */}
          <motion.div
            className="about-visual-col"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div className="hologram-portal" style={{ y: imgY }}>
              <div className="portal-ring ring-1"></div>
              <div className="portal-ring ring-2"></div>

              <div className="avatar-glass-card">
                <div className="avatar-inner">
                  <i className="fas fa-user-astronaut massive-avatar-icon"></i>
                </div>
                <div className="scan-line"></div>
              </div>

              {/* Floating Tech Badges around Avatar */}
              <motion.div className="floating-badge fb-1" animate={{ y: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <span>AI</span>
              </motion.div>
              <motion.div className="floating-badge fb-2" animate={{ y: [10, -10, 10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <span>WEB</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side: Identity Logs & Data */}
          <motion.div
            className="about-data-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Header Identity */}
            <motion.div className="identity-header" variants={fadeUp}>
              <div className="cyber-label text-pink-500">
                <i className="fas fa-fingerprint"></i> IDENTITY LOG
              </div>
              <h2 className="glitch-title" data-text="Pritish Jadhav">
                Pritish Jadhav
              </h2>
              <h3 className="sub-designation">
                <span className="text-purple-400">Full Stack Engineer</span> & <span className="text-emerald-400">Data Science Architect</span>
              </h3>
            </motion.div>

            {/* Core Bio Description */}
            <motion.div className="cyber-bio-card" variants={fadeUp}>
              <p>
                I am a passionate B.Tech student at <strong>VIT Pune</strong>. My engineering philosophy revolves around pushing the boundaries of what is possible on the web by seamlessly merging <strong>intelligent AI algorithms</strong> with <strong>hyper-optimized user interfaces</strong>.
              </p>
              <br />
              <p>
                When I'm not architecting databases or designing crazy web experiences, I'm conceptualizing startup ideas to bridge the gap between complex engineering and everyday utility.
              </p>
            </motion.div>

            {/* Fast Stats Dashboard */}
            <motion.div className="stats-dashboard" variants={fadeUp}>
              <div className="stat-pill">
                <i className="fas fa-calendar-alt"></i>
                <div className="stat-info">
                  <span className="stat-val">2006</span>
                  <span className="stat-lbl">ESTABLISHED</span>
                </div>
              </div>
              <div className="stat-pill">
                <i className="fas fa-map-marker-alt"></i>
                <div className="stat-info">
                  <span className="stat-val">PUNE</span>
                  <span className="stat-lbl">BASE SECURE</span>
                </div>
              </div>
              <div className="stat-pill">
                <i className="fas fa-laptop-code"></i>
                <div className="stat-info">
                  <span className="stat-val">CODECHEF</span>
                  <span className="stat-lbl">CURRENT OP</span>
                </div>
              </div>
            </motion.div>

            {/* Core Directives (Strengths) */}
            <motion.div className="directives-section" variants={fadeUp}>
              <h4 className="section-cyber-title">Core Directives //</h4>
              <div className="directives-grid">
                {[
                  { icon: "fa-rocket", title: "Rapid Innovation", color: "purple" },
                  { icon: "fa-brain", title: "Algorithmic Logic", color: "blue" },
                  { icon: "fa-bolt", title: "High Performance", color: "emerald" },
                  { icon: "fa-users", title: "Tactical Leadership", color: "pink" }
                ].map((dir, i) => (
                  <motion.div
                    key={i}
                    className={`directive-card border-${dir.color}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className={`dir-icon bg-${dir.color}`}>
                      <i className={`fas ${dir.icon}`}></i>
                    </div>
                    <span className="dir-title">{dir.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <section id="experience" className="insane-exp-section" ref={containerRef}>

      {/* Animated Deep Space Background */}
      <motion.div className="exp-parallax-bg" style={{ y: bgY }}>
        <div className="starfield"></div>
        <div className="nebula-glow"></div>
      </motion.div>

      <div className="container relative z-10">

        {/* Futuristic Section Header */}
        <motion.div
          className="exp-futuristic-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <div className="holographic-badge">
            <i className="fas fa-satellite-dish blink"></i> LIVE TRANSMISSION
          </div>
          <h2 className="exp-mega-title">
            <span className="outline">CAREER</span> LOGS
          </h2>
          <div className="header-divider"></div>
        </motion.div>

        {/* The Showcase Pipeline */}
        <div className="exp-pipeline">

          {/* Main Experience Node */}
          <motion.div
            className="pipeline-node primary-node"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
          >
            {/* Glowing Connector Line */}
            <div className="node-connector">
              <div className="connector-pulse"></div>
            </div>

            <div className="node-glass-card">
              <div className="card-top-bar">
                <div className="window-controls">
                  <span></span><span></span><span></span>
                </div>
                <div className="node-status text-emerald-400">
                  <span className="status-ping"></span> Currently Active
                </div>
              </div>

              <div className="node-content-core">
                <div className="role-meta">
                  <div className="company-branding">
                    <div className="company-logo-3d">
                      <i className="fas fa-cubes"></i>
                    </div>
                    <div>
                      <h3 className="company-name">CodeChef</h3>
                      <span className="company-chapter">VIT Pune Chapter</span>
                    </div>
                  </div>
                  <div className="role-duration-cyber">
                    <i className="far fa-clock"></i> 2024 - Present
                  </div>
                </div>

                <div className="role-title-mega">
                  <h4>Database Lead</h4>
                </div>

                <ul className="responsibility-matrix">
                  <motion.li whileHover={{ x: 10 }} className="matrix-item">
                    <i className="fas fa-caret-right text-purple-500"></i>
                    <p>Engineered and managed event databases for high-stakes competitive programming contests featuring <strong>500+ participants</strong>.</p>
                  </motion.li>
                  <motion.li whileHover={{ x: 10 }} className="matrix-item">
                    <i className="fas fa-caret-right text-purple-500"></i>
                    <p>Built robust <strong>Workflow Automation</strong> funnels, reducing manual participant management data entry operations by over 70%.</p>
                  </motion.li>
                  <motion.li whileHover={{ x: 10 }} className="matrix-item">
                    <i className="fas fa-caret-right text-purple-500"></i>
                    <p>Integrated performance tracking telemetry dashboards for real-time analytics and data-driven committee decisions.</p>
                  </motion.li>
                </ul>

                <div className="tech-stack-ribbon">
                  {['PostgreSQL', 'Workflow Automation', 'Data Analytics', 'Team Leadership'].map((tech) => (
                    <span key={tech} className="cyber-tag">{tech}</span>
                  ))}
                </div>

                <div className="ext-links">
                  <a href="https://www.linkedin.com/company/codechef-vitpune-chapter/" target="_blank" rel="noopener noreferrer" className="cyber-button ln-btn">
                    <i className="fab fa-linkedin-in"></i> LinkedIn Interface
                  </a>
                  <a href="https://www.instagram.com/codechefvitpune?igsh=MW14NW1ma2k2cXA0dA==" target="_blank" rel="noopener noreferrer" className="cyber-button ig-btn">
                    <i className="fab fa-instagram"></i> Instagram Interface
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Radar Node (Future Opportunities) */}
          <motion.div
            className="pipeline-node secondary-node"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          >
            <div className="node-glass-card radar-card">
              <div className="radar-scanner">
                <div className="scanner-beam"></div>
              </div>
              <div className="radar-content">
                <h4>Awaiting Next Directive</h4>
                <p>Currently radar sweeping for ambitious teams to build the next generation of web and AI architecture.</p>
                <div className="target-sectors">
                  <span className="target-pill">Full Stack Engineering</span>
                  <span className="target-pill">AI Integration</span>
                  <span className="target-pill">Backend Architecture</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Experience;

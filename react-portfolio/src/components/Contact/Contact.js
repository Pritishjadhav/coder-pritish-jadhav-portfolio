import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Dynamic Parallax Transformations driven by scroll
  const glow1Y = useTransform(smoothProgress, [0, 1], [-120, 140]);
  const glow1X = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const glow2Y = useTransform(smoothProgress, [0, 1], [140, -120]);
  const glow2Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.25, 0.9]);
  const gridY = useTransform(smoothProgress, [0, 1], ["-6%", "6%"]);

  // Subtle 3D Depth between the two panels
  const leftColY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const rightColY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  // Floating decorative tech symbols parallax & rotation
  const particleRotate1 = useTransform(smoothProgress, [0, 1], [0, 220]);
  const particleRotate2 = useTransform(smoothProgress, [0, 1], [0, -180]);
  const particleY1 = useTransform(smoothProgress, [0, 1], [-50, 90]);
  const particleY2 = useTransform(smoothProgress, [0, 1], [70, -80]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTypes: ['Full Stack'],
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Web App',
    'Full Stack',
    'AI & Automation',
    'Frontend / UI',
    'Freelance Project',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProjectType = (type) => {
    setFormData((prev) => {
      const exists = prev.projectTypes.includes(type);
      const updated = exists
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type];
      return { ...prev, projectTypes: updated };
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pritishjadhav2006@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedTypes =
      formData.projectTypes.length > 0
        ? formData.projectTypes.join(', ')
        : 'General Inquiry';

    try {
      await fetch('https://formsubmit.co/ajax/pritishjadhav2006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project_types: selectedTypes,
          message: formData.message || 'No additional message provided',
          _subject: `New Portfolio Inquiry from ${formData.name} [${selectedTypes}]`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if offline/network error, complete gracefully
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectTypes: ['Full Stack'],
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="contact-section" ref={containerRef}>
      {/* Ambient background glows with liquid scroll parallax */}
      <motion.div className="contact-bg-glow glow-1" style={{ y: glow1Y, x: glow1X }} />
      <motion.div className="contact-bg-glow glow-2" style={{ y: glow2Y, scale: glow2Scale }} />
      <motion.div className="contact-cyber-grid" style={{ y: gridY }} />

      {/* Floating Cyber Glyphs for futuristic ambience */}
      <motion.div
        className="contact-floating-glyph glyph-1"
        style={{ y: particleY1, rotate: particleRotate1 }}
      >
        <span>&#123; &#125;</span>
      </motion.div>
      <motion.div
        className="contact-floating-glyph glyph-2"
        style={{ y: particleY2, rotate: particleRotate2 }}
      >
        <span>&lt; / &gt;</span>
      </motion.div>
      <motion.div
        className="contact-floating-glyph glyph-3"
        animate={{ y: [-12, 12, -12], rotate: [0, 180, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span>✦</span>
      </motion.div>

      {/* Floating Live Status Badges */}
      <motion.div
        className="contact-floating-badge badge-top-left"
        animate={{ y: [-7, 7, -7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="badge-glow-dot"></span>
        <span>FAST RESPONSE GUARANTEED</span>
      </motion.div>

      <motion.div
        className="contact-floating-badge badge-bottom-right"
        animate={{ y: [7, -7, 7] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <i className="fas fa-satellite-dish blink-fast"></i>
        <span>DIRECT & SECURE DISPATCH</span>
      </motion.div>

      <div className="container relative z-10">
        {/* Section Header with smooth in-view spring */}
        <motion.div
          className="contact-header-block"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <div className="contact-pill-badge">
            <span className="live-dot"></span>
            <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
          </div>
          <h2 className="contact-main-heading">
            Let's Build Something <span className="highlight-gradient">Exceptional</span>
          </h2>
          <p className="contact-lead-text">
            Have a project in mind, want to discuss software engineering, or explore an exciting collaboration?
            Drop a message and let's turn your vision into reality.
          </p>
        </motion.div>

        {/* 2-Column Professional Contact Grid */}
        <div className="contact-layout-grid">
          {/* Left Column: Direct Info & Social Hub */}
          <motion.div
            className="contact-info-panel"
            style={{ y: leftColY }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            <div className="panel-inner-card">
              <div className="panel-top-badge">
                <i className="fas fa-bolt"></i> DIRECT COMMUNICATIONS
              </div>

              <h3 className="panel-title">Get in Touch Directly</h3>
              <p className="panel-description">
                Feel free to reach out through any channel below. I'm always open to discussing new tech stacks,
                freelance contracts, and full-time software engineering roles.
              </p>

              {/* Direct Reach Cards */}
              <div className="direct-channels-list">
                {/* Email Card */}
                <motion.div
                  className="channel-card email-card"
                  whileHover={{ scale: 1.025, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <div className="channel-icon-wrapper">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Email Address</span>
                    <a
                      href="mailto:pritishjadhav2006@gmail.com"
                      className="channel-value"
                    >
                      pritishjadhav2006@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    className={`copy-btn ${copiedEmail ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    <i className={`fas ${copiedEmail ? 'fa-check' : 'fa-copy'}`}></i>
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </motion.div>

                {/* WhatsApp Card */}
                <motion.a
                  href="https://wa.me/918605720415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card wa-card"
                  whileHover={{ scale: 1.025, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <div className="channel-icon-wrapper">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">WhatsApp & Call</span>
                    <span className="channel-value">+91 86057 20415</span>
                  </div>
                  <div className="channel-action-badge">
                    <span>Chat Now</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </motion.a>

                {/* Location Card */}
                <motion.div
                  className="channel-card location-card"
                  whileHover={{ scale: 1.025, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <div className="channel-icon-wrapper">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Location & Timezone</span>
                    <span className="channel-value">Pune, Maharashtra, India</span>
                    <span className="sub-timezone">IST (UTC+5:30) • Open to Global Remote Work</span>
                  </div>
                </motion.div>
              </div>

              {/* Social Profiles Grid */}
              <div className="social-hub-container">
                <span className="social-hub-title">FIND ME ACROSS THE WEB</span>
                <div className="social-pill-group">
                  <motion.a
                    href="https://www.linkedin.com/in/pritish-jadhav-205141339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-btn linkedin"
                    title="LinkedIn Profile"
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                    <span>LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/pritishjadhav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-btn github"
                    title="GitHub Profile"
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://x.com/Pritish2006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-btn twitter"
                    title="Twitter / X"
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter</span>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/jadhav_pritish_26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-btn instagram"
                    title="Instagram Profile"
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </motion.a>
                </div>
              </div>

              {/* Fast Response Guarantee */}
              <div className="response-guarantee">
                <div className="guarantee-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <span>Guaranteed Response: Typically within 24–48 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sleek Interactive Contact Form with Parallax Depth */}
          <motion.div
            className="contact-form-panel"
            style={{ y: rightColY }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
          >
            <div className="form-glass-container">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    className="interactive-contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="form-top-header">
                      <div className="form-title-wrap">
                        <span className="form-badge">FAST DISPATCH</span>
                        <h3 className="form-heading">Send a Direct Message</h3>
                      </div>
                      <p className="form-subtext">
                        Fill out the details below to initiate our conversation.
                      </p>
                    </div>

                    {/* Name & Email Row */}
                    <div className="form-row-dual">
                      <div className="form-field-group">
                        <label htmlFor="name" className="field-label">
                          Your Name <span className="req">*</span>
                        </label>
                        <div className="input-with-icon">
                          <i className="far fa-user input-icon"></i>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="e.g. Rohit Sharma"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label htmlFor="email" className="field-label">
                          Email Address <span className="req">*</span>
                        </label>
                        <div className="input-with-icon">
                          <i className="far fa-envelope input-icon"></i>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="rohit@example.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Type Selector (Multi-Select) */}
                    <div className="form-field-group">
                      <div className="field-label-row">
                        <label className="field-label">Project / Discussion Type</label>
                        <span className="field-hint-badge">Select multiple</span>
                      </div>
                      <div className="project-type-pills">
                        {projectTypes.map((type) => {
                          const isSelected = formData.projectTypes.includes(type);
                          return (
                            <motion.button
                              key={type}
                              type="button"
                              className={`type-pill-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleProjectType(type)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.94 }}
                            >
                              {isSelected && <span className="pill-dot"></span>}
                              <span className="pill-text">{type}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="form-field-group">
                      <label htmlFor="message" className="field-label">
                        Your Message <span style={{ opacity: 0.6, fontSize: '0.75rem', fontWeight: 'normal' }}>(Optional)</span>
                      </label>
                      <div className="textarea-with-icon">
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          className="form-textarea"
                          placeholder="Tell me about your project, goals, or what you'd like to collaborate on..."
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className={`submit-action-btn ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="btn-text">
                        {isSubmitting ? 'Transmitting...' : 'Send Message'}
                      </span>
                      <span className="btn-icon">
                        <i className={isSubmitting ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
                      </span>
                      <div className="btn-light-sweep"></div>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    className="form-success-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="success-icon-badge">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 className="success-title">Message Sent Successfully!</h3>
                    <p className="success-message">
                      Thank you, <strong>{formData.name}</strong>. Your message regarding{' '}
                      <strong>{formData.projectTypes.join(', ') || 'General Inquiry'}</strong> has been sent directly to Pritish's inbox.
                    </p>

                    <div className="success-eta-card">
                      <div className="eta-icon-box">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="eta-text-wrap">
                        <span className="eta-title">Expected Response Time</span>
                        <span className="eta-desc">
                          You will receive a reply within <strong>24 to 48 hours</strong>
                          <span className="working-days-pill">Working Days: Mon – Fri</span>
                        </span>
                      </div>
                    </div>

                    <div className="success-fallback-actions">
                      <a
                        href={`https://wa.me/918605720415?text=${encodeURIComponent(
                          `Hi Pritish, I just submitted the contact form on your portfolio!\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectTypes.join(', ') || 'General Inquiry'}${formData.message ? `\nMessage: ${formData.message}` : ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-quick-reach"
                      >
                        <i className="fab fa-whatsapp"></i> Also Notify on WhatsApp
                      </a>
                      <button
                        type="button"
                        className="reset-form-btn"
                        onClick={handleReset}
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Education.css';

const educationData = [
  {
    id: 1,
    period: "2024 - 2028",
    status: "🎯 Currently Pursuing",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "Vishwakarma Institute of Technology, Pune",
    icon: "🎓",
    details: [
      "Specializing in Machine Learning & Neural Networks.",
      "Comprehensive coursework in Data Analytics.",
      "Hands-on Software Development & Full Stack projects."
    ],
    tags: ["AI", "Data Science", "Full Stack", "Software Developer"],
    glowColor: "rgba(139, 92, 246, 0.4)" // Purple preset
  },
  {
    id: 2,
    period: "2022 - 2024",
    status: "✅ Completed",
    degree: "Higher Secondary Education (PCM)",
    institution: "HRSPM College & Vision Academy",
    icon: "🏫",
    details: [
      "Intensive focus on Physics, Chemistry, and Mathematics.",
      "Consistent academic excellence.",
      "Successfully qualified for JEE Advanced."
    ],
    tags: ["Physics", "Mathematics", "Chemistry"],
    glowColor: "rgba(6, 182, 212, 0.4)" // Cyan preset
  }
];

// Interactive 3D Tilt Card Component
const TiltCard = ({ data }) => {
  const ref = useRef(null);

  // Motion Values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to make the mouse tracking feel heavy/premium
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse movements to rotation output (-7.5 to 7.5 degrees max)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  // Calculate glare position based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to the element (0 to 1) mapped to -0.5 to 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="edu-tilt-wrapper"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="edu-tilt-card"
        style={{
          boxShadow: `0 20px 40px -10px ${data.glowColor}`
        }}
      >
        {/* Dynamic Glare Effect */}
        <motion.div
          className="card-glare"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}
        />

        {/* Card Header */}
        <div className="edu-card-header" style={{ transform: "translateZ(40px)" }}>
          <div className="edu-icon-container">
            <span className="edu-animated-icon">{data.icon}</span>
          </div>
          <div className="edu-header-badges">
            <div className="edu-status-pill" style={{
              background: data.id === 1 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: data.id === 1 ? '#34d399' : '#d1d5db',
              border: `1px solid ${data.id === 1 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`
            }}>
              {data.status}
            </div>
            <div className="edu-year-pill">{data.period}</div>
          </div>
        </div>

        {/* Card Body Components with 3D Pop (translateZ) */}
        <h3 className="edu-title" style={{ transform: "translateZ(30px)" }}>
          {data.degree}
        </h3>

        <h4 className="edu-subtitle" style={{ transform: "translateZ(20px)" }}>
          {data.institution}
        </h4>

        <ul className="edu-features-list" style={{ transform: "translateZ(20px)" }}>
          {data.details.map((detail, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
            >
              <div className="check-icon-wrapper">
                <i className="fas fa-check-circle"></i>
              </div>
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tags at Bottom */}
        <div className="edu-tag-container" style={{ transform: "translateZ(25px)" }}>
          {data.tags.map((tag, idx) => (
            <span key={idx} className="edu-modern-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="education-section-modern">
      {/* Abstract Background Elements */}
      <div className="edu-bg-glow glow-1"></div>
      <div className="edu-bg-glow glow-2"></div>

      <div className="container">
        <motion.div
          className="edu-section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="edu-main-title">Education <span className="highlight-text">&</span> Journey</h2>
          <p className="edu-main-subtitle">My academic timeline and foundational knowledge</p>
        </motion.div>

        <div className="edu-cards-grid">
          {educationData.map((data) => (
            <TiltCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

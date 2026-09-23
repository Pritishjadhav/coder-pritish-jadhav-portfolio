import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Skills.css';

const skillsData = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', shadow: '#E34F26', category: 'Frontend' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', shadow: '#1572B6', category: 'Frontend' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', shadow: '#F7DF1E', category: 'Frontend' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', shadow: '#61DAFB', category: 'Frontend' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', shadow: '#339933', category: 'Backend' },
  { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', shadow: '#FFFFFF', category: 'Backend' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', shadow: '#47A248', category: 'Database' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', shadow: '#4479A1', category: 'Database' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', shadow: '#3776AB', category: 'Language' },
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', shadow: '#A8B9CC', category: 'Language' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', shadow: '#00599C', category: 'Language' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', shadow: '#F05032', category: 'Tools' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', shadow: '#FFFFFF', category: 'Tools' },
];

// Split array for the honeycomb rows
const row1 = skillsData.slice(0, 4);
const row2 = skillsData.slice(4, 9);
const row3 = skillsData.slice(9, 13);

const Hexagon = ({ skill, index }) => {
  return (
    <motion.div
      className="hex-wrapper"
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.1
      }}
      whileHover={{
        scale: 1.15,
        zIndex: 50,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      style={{ '--hex-color': skill.shadow }}
    >
      <div className="hex-outer">
        <div className="hex-inner">
          <div className="hex-content">
            <div className="hex-glow"></div>
            <img src={skill.logo} alt={skill.name} className="hex-logo" />
            <span className="hex-name">{skill.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);

  // Create a stunning parallax starfield background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section id="skills" className="ultra-skills-section" ref={containerRef}>

      {/* Immersive Parallax Background */}
      <div className="cyber-grid-container">
        <motion.div className="cyber-grid-line vertical" style={{ y: y1 }}></motion.div>
        <motion.div className="cyber-grid-line horizontal" style={{ x: y2 }}></motion.div>
        <motion.div className="cyber-shape-1" style={{ rotate, y: y1 }}></motion.div>
        <motion.div className="cyber-shape-2" style={{ rotate: useTransform(rotate, r => -r), y: y2 }}></motion.div>
      </div>

      <div className="container relative z-10">

        <motion.div
          className="ultra-skills-header"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        >
          <div className="circuit-badge">
            <i className="fas fa-microchip"></i> <span>Core Stack</span>
          </div>
          <h2 className="ultra-title" data-text="TECHNOLOGIES">
            TECHNOLOGIES
          </h2>
          <p className="ultra-subtitle">My interactive development ecosystem</p>
        </motion.div>

        {/* Honeycomb Geometry Layout */}
        <div className="honeycomb-container">

          <div className="honeycomb-row row-1">
            {row1.map((skill, i) => (
              <Hexagon key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          <div className="honeycomb-row row-2">
            {row2.map((skill, i) => (
              <Hexagon key={skill.name} skill={skill} index={i + 4} />
            ))}
          </div>

          <div className="honeycomb-row row-3">
            {row3.map((skill, i) => (
              <Hexagon key={skill.name} skill={skill} index={i + 9} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;

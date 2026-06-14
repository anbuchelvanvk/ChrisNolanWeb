import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

const InstagramIcon = ({ size, color, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ size, color, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
);

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <motion.h1 
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Contact Me
        </motion.h1>
      </div>

      <div className="contact-content" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '2rem 1rem', minHeight: '60vh' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
          Have a question about the project, want to report a bug, or just want to discuss Christopher Nolan's cinematic universe? Feel free to reach out to me!
        </p>

        <div className="social-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <a href="https://instagram.com/itsanbuchelvan" target="_blank" rel="noopener noreferrer" className="social-card">
            <InstagramIcon size={36} color="#E1306C" className="social-icon" />
            <h3>Instagram</h3>
            <p>@itsanbuchelvan</p>
          </a>

          <a href="https://twitter.com/itsanbuchelvan" target="_blank" rel="noopener noreferrer" className="social-card">
            <TwitterIcon size={36} color="#1DA1F2" className="social-icon" />
            <h3>X (Twitter)</h3>
            <p>@itsanbuchelvan</p>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;

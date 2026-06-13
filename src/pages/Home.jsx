import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { movies } from '../data/movies';

const Home = () => {
  const calculateTimeLeft = () => {
    const releaseDate = new Date('2026-07-17T00:00:00'); // Fictional release date
    const difference = releaseDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [aspectMode, setAspectMode] = useState(0);

  const aspectModes = [
    { name: '70MM FILM', scope: '1.43:1', clipPath: 'inset(0 10%)' },
    { name: 'DIGITAL', scope: '1.90:1', clipPath: 'inset(3.5% 0)' },
    { name: 'ANAMORPHIC', scope: '2.39:1', clipPath: 'inset(13% 0)' }
  ];

  const toggleAspectMode = () => {
    setAspectMode((prev) => (prev + 1) % aspectModes.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;
    timerComponents.push(
      <div key={interval} className="countdown-item-new">
        <span className="countdown-value-new">{timeLeft[interval]}</span>
        <span className="countdown-label-new">{interval}</span>
      </div>
    );
  });

  const scrollerMovies = [...movies, ...movies];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      {/* 1. Stunning Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-video-bg"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          style={{ 
            clipPath: aspectModes[aspectMode].clipPath,
            transition: 'clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)'
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content-new">
          <motion.h1 
            className="hero-title-mega"
            initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            CHRIST
            <svg width="1em" height="1em" viewBox="0 0 100 100" className="bomb-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 80 Q50 70 70 80 L75 100 L25 100 Z" fill="#2a2a2a" />
              <path d="M40 80 L40 50 Q40 40 50 40 Q60 40 60 50 L60 80 Z" fill="#333" />
              <circle cx="50" cy="35" r="25" fill="#ff4500" filter="url(#glow)"/>
              <circle cx="35" cy="45" r="15" fill="#ff6347" />
              <circle cx="65" cy="45" r="15" fill="#ff6347" />
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
            </svg>
            PHER
            <br />
            <span className="text-gradient">N
            <svg width="1em" height="1em" viewBox="0 0 100 100" className="endurance-icon" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#ccc" strokeWidth="6" fill="none" strokeDasharray="15 6" />
              <circle cx="50" cy="50" r="28" stroke="#888" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="12" fill="#fff" />
              <path d="M50 10 L50 38 M50 90 L50 62 M10 50 L38 50 M90 50 L62 50" stroke="#ccc" strokeWidth="6" />
              <path d="M21 21 L35 35 M79 79 L65 65 M79 21 L65 35 M21 79 L35 65" stroke="#aaa" strokeWidth="3" />
            </svg>
            LAN</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle-new"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Visionary Director.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="hero-cta"
          >
            <Link to="/movies" className="btn-glow">Explore His Universe</Link>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2, type: "spring" }}
          className="imax-floating-badge"
          onClick={toggleAspectMode}
        >
          <div className="imax-hint">Click to change format</div>
          <div className="imax-badge-inner">
            <span className="imax-top">SHOT ON</span>
            <span className="imax-main">IMAX</span>
            <span className="imax-bottom">{aspectModes[aspectMode].name}</span>
            <span className="imax-scope" style={{ fontSize: '0.55rem', color: '#fff', marginTop: '2px', letterSpacing: '1px' }}>{aspectModes[aspectMode].scope} RATIO</span>
          </div>
        </motion.div>
      </section>

      {/* 2. Interactive Scroller Section */}
      <section className="scroller-section">
        <div className="scroller-header">
          <h2>Iconic Filmography</h2>
          <div className="scroller-line"></div>
        </div>
        <motion.div 
          className="scroller-container-new"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="scroller-track-new">
            {scrollerMovies.map((movie, idx) => (
              <Link to={`/movies/${movie.id}`} key={idx} className="scroller-card">
                <img src={movie.image} alt={movie.title} className="scroller-image-new" />
                <div className="scroller-card-overlay">
                  <h4>{movie.title}</h4>
                  <p>{movie.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. The Odyssey Countdown Banner */}
      <section className="odyssey-banner">
        <div className="odyssey-bg" />
        <div className="odyssey-content">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="odyssey-badge">UPCOMING RELEASE</span>
            <h2 className="odyssey-title">THE ODYSSEY</h2>
            <p className="odyssey-desc">Venture beyond the known universe in Nolan's next cinematic masterpiece.</p>
            
            <div className="countdown-box">
              {timerComponents.length ? timerComponents : <span className="now-showing">In Theaters Now!</span>}
            </div>
            
            <Link to="/movies/the-odyssey" className="btn-outline">View Details</Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const wikiImages = [
    { src: import.meta.env.BASE_URL + "images/nolan_portrait.jpg", alt: "Christopher Nolan Portrait", label: "The Visionary" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Christopher_Nolan%2C_London%2C_2013_%28crop%29.jpg", alt: "Christopher Nolan 2013", label: "London, 2013" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Christopher_Nolan_TCL.jpg", alt: "Christopher Nolan Handprints", label: "TCL Chinese Theatre" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Christopher_Nolan_and_Emma_Thomas.jpg", alt: "Christopher Nolan and Emma Thomas", label: "With Emma Thomas" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cannes_2018_4.jpg", alt: "Cannes 2018", label: "Cannes Film Festival" },
  ];

  // Emojis for the background
  const emojis = ['🏆', '🎬', '🌟', '🎥', '🎞️', '🎖️', '🏅', '🎭'];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0a0a0a', color: '#fff', padding: 'clamp(6rem, 15vw, 10rem) 5% 5rem' }}>
      
      {/* Floating Emojis Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: `${Math.random() * 100}vh`, 
              x: `${Math.random() * 100}vw`,
              rotate: Math.random() * 360,
              scale: Math.random() * 2 + 1
            }}
            animate={{ 
              y: [null, `${Math.random() * 100}vh`],
              x: [null, `${Math.random() * 100}vw`],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ position: 'absolute', fontSize: '2rem' }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        <motion.h2 
          className="section-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', textAlign: 'center', marginBottom: '1rem', background: 'linear-gradient(45deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Sir Christopher Nolan
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ textAlign: 'center', fontSize: '1.2rem', color: '#aaa', marginBottom: '4rem', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          CBE • 7th Highest-Grossing Director • Academy Award Winner
        </motion.p>

        {/* Introduction / Bio Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'center' }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <img src={wikiImages[0].src} alt={wikiImages[0].alt} style={{ width: '100%', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{wikiImages[0].label}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ddd' }}
          >
            <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>The Auteur</h3>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#fff' }}>Sir Christopher Edward Nolan</strong> (born 30 July 1970) is a British and American filmmaker. As a significant auteur of his generation, he has established himself as a major figure of 21st-century Hollywood. His films have earned over <strong>$6 billion worldwide</strong>, making him the seventh highest-grossing film director of all time.
            </p>
            <p>
              After studying English literature at University College London, he made his feature film debut with <Link to="/movies/following" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>Following</em></Link> (1998) and gained international recognition with <Link to="/movies/memento" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>Memento</em></Link> (2000). He later revolutionized the blockbuster landscape with <Link to="/movies/the-dark-knight" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>The Dark Knight</em></Link> trilogy, <Link to="/movies/inception" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>Inception</em></Link>, <Link to="/movies/interstellar" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>Interstellar</em></Link>, and most recently, the critically acclaimed <Link to="/movies/oppenheimer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}><em>Oppenheimer</em></Link>.
            </p>
          </motion.div>
        </div>

        {/* Vision & Style Section */}
        <div style={{ background: 'rgba(25, 25, 25, 0.6)', padding: '4rem 3rem', borderRadius: '20px', marginBottom: '5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)', textAlign: 'center' }}
          >
            Cinematic Vision & Signature Style
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '2rem' }}>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Metaphysical Themes</h4>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Infused with a metaphysical outlook, his works thematize epistemology, existentialism, ethics, the construction of time, and the malleable nature of memory and personal identity.</p>
            </motion.div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Technical Mastery</h4>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>They feature mathematically inspired images, unconventional narrative structures, practical special effects, experimental soundscapes, and large-format film photography (IMAX 70mm).</p>
            </motion.div>
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.2rem' }}>Syncopy Inc.</h4>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Nolan co-writes several films with his brother, Jonathan Nolan, and runs his production company, <strong>Syncopy Inc.</strong>, alongside his wife and producer, Emma Thomas.</p>
            </motion.div>
          </div>
        </div>

        {/* Awards & Box Office Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Legacy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { label: 'Academy Awards', value: '2', icon: '🏆' },
              { label: 'Golden Globes', value: '1', icon: '🌟' },
              { label: 'BAFTA Awards', value: '2', icon: '🎭' },
              { label: 'Worldwide Box Office', value: '>$6B', icon: '💰' },
              { label: 'National Film Registry', value: '3 Films', icon: '🎞️' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10, scale: 1.05 }}
                style={{ background: 'linear-gradient(135deg, rgba(40,40,40,0.8), rgba(20,20,20,0.8))', padding: '2rem 1rem', borderRadius: '15px', border: '1px solid rgba(255,215,0,0.1)' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Life & Work</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
            {wikiImages.slice(1).map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '250px' }}
              >
                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '0.8rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                  <span style={{ fontSize: '0.8rem', color: '#eee' }}>{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;

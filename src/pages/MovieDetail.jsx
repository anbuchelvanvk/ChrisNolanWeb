import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Music, Users, Camera, Clapperboard, Clock, Star, DollarSign, Info, X, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { movies } from '../data/movies';
import React, { useEffect, useState } from 'react';

const renderImaxText = (text) => {
  if (!text.includes('IMAX')) return text;
  const parts = text.split('IMAX');
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index !== parts.length - 1 && <span className="imax-word" title="70MM IMAX">IMAX</span>}
    </React.Fragment>
  ));
};

const movieElements = {
  "the-odyssey": ['🏛️', '⚔️', '🌊', '🐎', '🏺'],
  "oppenheimer": ['⚛️', '💥', '🔬', '🎩', '⏳'],
  "tenet": ['🔄', '🔫', '⏱️', '✈️', '🎭'],
  "dunkirk": ['🚢', '🛩️', '⏳', '🌊', '🇬🇧'],
  "interstellar": ['🚀', '🌌', '🪐', '🌽', '🛸'],
  "the-dark-knight-rises": ['🦇', '💣', '🏟️', '🌉', '🥷'],
  "inception": ['🌀', '🎲', '🏢', '❄️', '🚆'],
  "the-dark-knight": ['🦇', '🤡', '🃏', '🪙', '🚓'],
  "the-prestige": ['🎩', '🕊️', '⚡', '🎭', '🪄'],
  "batman-begins": ['🦇', '🥷', '🚂', '🌸', '🌃'],
  "insomnia": ['☀️', '👁️', '🏔️', '🔫', '🩸'],
  "memento": ['📸', '🖋️', '🧩', '🔫', '🧠'],
  "following": ['👁️', '🚶‍♂️', '🚪', '💼', '🕵️']
};

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showDigitalInfo, setShowDigitalInfo] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const openPhoto = (idx) => setSelectedPhoto(idx);
  const closePhoto = () => setSelectedPhoto(null);

  const getShareMessage = () => `Check out ${movie.title} (${movie.year}) on Christopher Nolan's Cinematic Portal ${window.location.href} crafted by x.com/itsanbuchelvan!`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Check out ${movie.title} (${movie.year}) on Christopher Nolan's Cinematic Portal crafted by x.com/itsanbuchelvan!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhoto(prev => (prev + 1) % movie.photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhoto(prev => (prev - 1 + movie.photos.length) % movie.photos.length);
  };

  if (!movie) {
    return <div style={{color: 'white', marginTop: '100px', textAlign: 'center'}}>Movie not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="movie-detail-container"
    >
      {/* Floating Emojis Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1, pointerEvents: 'none', opacity: 0.15 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: `${Math.random() * 100}vh`, 
              x: `${Math.random() * 100}vw`,
              rotate: Math.random() * 360,
              scale: Math.random() * 1.5 + 0.5
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
            style={{ position: 'absolute', fontSize: '2.5rem' }}
          >
            {movieElements[movie.id]?.[Math.floor(Math.random() * movieElements[movie.id]?.length)]}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="movie-detail-bg"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      <div className="movie-detail-gradient" />
      
      <div className="movie-detail-content">
        <motion.div 
          className="detail-poster-container"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={movie.image} alt={movie.title} className="detail-poster" />
        </motion.div>
        
        <motion.div 
          className="detail-info"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="detail-meta">
            <span className="detail-year" style={{ color: movie.color }}>{movie.year}</span>
            {movie.runtime && (
              <span className="meta-item"><Clock size={16} /> {movie.runtime}</span>
            )}
            {movie.certification && (
              <span className="meta-item certification-badge">{movie.certification}</span>
            )}
            {movie.imdbRating && (
              <span className="meta-item"><Star size={16} fill="var(--accent-color)" color="var(--accent-color)" /> {movie.imdbRating}</span>
            )}
            {movie.boxOffice && (
              <span className="meta-item"><DollarSign size={16} /> {movie.boxOffice}</span>
            )}
          </div>

          {movie.genres && (
            <div className="genres-list">
              {movie.genres.map((genre, idx) => (
                <span key={idx} className="genre-tag">{genre}</span>
              ))}
            </div>
          )}

          <p className="detail-desc">{renderImaxText(movie.description)}</p>

          <div className="crew-info">
            <p><strong><Clapperboard size={16} /> Director:</strong> {movie.crew.director}</p>
            <p><strong><Camera size={16} /> Cinematographer:</strong> {movie.crew.cinematographer}</p>
            <p><strong><Music size={16} /> Composer:</strong> {movie.crew.composer}</p>
          </div>
          <div className="action-buttons-group">
            <div className="primary-actions">
              <button className="digital-info-btn" onClick={() => setShowDigitalInfo(true)}>
                <Play size={20} /> Movie Digital Info
              </button>
              <button className="share-btn" onClick={handleShare} title="Share Movie">
                <Share2 size={20} />
              </button>
            </div>
            
            <Link to="/movies" className="back-btn back-btn-new">
              <ArrowLeft size={20} />
              <span>Back to Filmography</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="rich-content">
        {/* Trivia Section */}
        {movie.trivia && movie.trivia.length > 0 && (
          <div className="detail-section trivia-section">
            <h2 className="section-title-sm"><Info size={24} /> Did You Know?</h2>
            <ul className="trivia-list">
              {movie.trivia.map((fact, idx) => (
                <li key={idx} className="trivia-item">{renderImaxText(fact)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Cast Section */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title-sm"><Users size={24} /> Top Cast</h2>
            <div className="cast-grid">
              {movie.cast.map((actor, idx) => (
                <div key={idx} className="cast-card">
                  <img 
                    src={actor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=random&color=fff&size=200`} 
                    alt={actor.name} 
                    className="cast-image" 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=random&color=fff&size=200` }}
                  />
                  <div className="cast-text">
                    <p className="cast-name">{actor.name}</p>
                    <p className="cast-role">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Section */}
        <div className="media-grid">
          {movie.trailer && (
            <div className="detail-section">
              <h2 className="section-title-sm"><Play size={24} /> Official Trailer</h2>
              <div className="iframe-container">
                <iframe 
                  src={movie.trailer} 
                  title={`${movie.title} Trailer`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {movie.soundtrack && (
            <div className="detail-section">
              <h2 className="section-title-sm"><Music size={24} /> Original Soundtrack</h2>
              {movie.soundtrack === "coming_soon" ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ fontSize: '1.2rem', color: '#aaa', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Coming Soon</p>
                </div>
              ) : (
                <div className="iframe-container">
                  <iframe 
                    src={movie.soundtrack} 
                    title={`${movie.title} Soundtrack`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Photos Section */}
        {movie.photos && movie.photos.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title-sm"><Camera size={24} /> Gallery</h2>
            <div className="photos-grid">
              {movie.photos.map((photo, idx) => {
                const imgUrl = typeof photo === 'string' ? photo : photo.url;
                return (
                  <img 
                    key={idx} 
                    src={imgUrl} 
                    alt={`${movie.title} scene ${idx}`} 
                    className="gallery-image" 
                    onClick={() => openPhoto(idx)}
                    style={{ cursor: 'pointer' }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedPhoto !== null && (
        <div className="photo-modal" onClick={closePhoto}>
          <button className="photo-modal-close" onClick={closePhoto}><X size={30} /></button>
          <button className="photo-modal-prev" onClick={prevPhoto}><ChevronLeft size={40} /></button>
          <button className="photo-modal-next" onClick={nextPhoto}><ChevronRight size={40} /></button>
          <div className="photo-modal-content" onClick={e => e.stopPropagation()}>
            <img 
              src={typeof movie.photos[selectedPhoto] === 'string' ? movie.photos[selectedPhoto] : movie.photos[selectedPhoto].url} 
              alt="Gallery Full" 
            />
            <p className="photo-modal-desc">
              {typeof movie.photos[selectedPhoto] === 'string' 
                ? `${movie.title} - Image ${selectedPhoto + 1}`
                : movie.photos[selectedPhoto].description}
            </p>
          </div>
        </div>
      )}
      {showDigitalInfo && (
        <div className="digital-info-modal" onClick={() => setShowDigitalInfo(false)}>
          <div className="digital-info-content scrollable" onClick={e => e.stopPropagation()}>
            <button className="digital-info-close" onClick={() => setShowDigitalInfo(false)}>
              <X size={24} />
            </button>
            
            <div className="digital-header">
               <img src={movie.image} alt={movie.title} className="digital-poster" />
               <div className="digital-header-text">
                 <h2 className="digital-info-title">{movie.title} ({movie.year})</h2>
                 <div className="digital-info-meta">
                   {movie.imdbRating && <span><Star size={16} color="var(--accent-color)" /> {movie.imdbRating}</span>}
                   {movie.runtime && <span><Clock size={16} /> {movie.runtime}</span>}
                   {movie.certification && <span className="certification-badge">{movie.certification}</span>}
                 </div>
                 {movie.genres && (
                   <div className="digital-genres">
                     {movie.genres.map((g, i) => <span key={i} className="digital-genre-tag">{g}</span>)}
                   </div>
                 )}
               </div>
            </div>

            <div className="digital-section">
              <h3>Crew</h3>
              <div className="digital-crew-grid">
                <p><strong>Director:</strong> {movie.crew.director}</p>
                {movie.crew.writer && <p><strong>Writer:</strong> {movie.crew.writer}</p>}
                <p><strong>Composer:</strong> {movie.crew.composer}</p>
                <p><strong>Cinematography:</strong> {movie.crew.cinematographer}</p>
              </div>
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className="digital-section">
                <h3>Top Cast</h3>
                <div className="digital-cast-list">
                  {movie.cast.map((actor, idx) => (
                    <span key={idx} className="digital-cast-item">{actor.name}</span>
                  ))}
                </div>
              </div>
            )}

            {movie.trailer && (
              <div className="digital-section">
                <h3>Trailer</h3>
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="digital-trailer-link">
                  <Play size={16} fill="currentColor" /> Watch Official Trailer
                </a>
              </div>
            )}

            <div className="digital-section digital-info-ott">
              <h3>Streaming Platforms</h3>
              {movie.whereToWatch && movie.whereToWatch.length > 0 ? (
                <div className="digital-ott-links">
                  {movie.whereToWatch.map((platform, idx) => (
                    <a key={idx} href={platform.link} target="_blank" rel="noopener noreferrer" className="ott-link-card">
                      <span className="ott-platform-name">{platform.platform}</span>
                      <Play size={16} />
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{fontStyle: 'italic', color: '#aaa'}}>Coming soon to OTT</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showShareMenu && (
        <div className="digital-info-modal" onClick={() => setShowShareMenu(false)}>
          <div className="digital-info-content" style={{maxWidth: '400px'}} onClick={e => e.stopPropagation()}>
            <button className="digital-info-close" onClick={() => setShowShareMenu(false)}>
              <X size={24} />
            </button>
            <h2 className="digital-info-title" style={{fontSize: '1.5rem'}}>Share Movie</h2>
            <div className="digital-ott-links" style={{marginTop: '1.5rem'}}>
               <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${movie.title} (${movie.year}) on Christopher Nolan's Cinematic Portal crafted by x.com/itsanbuchelvan!`)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="ott-link-card">
                 <span className="ott-platform-name">Share on X (Twitter)</span>
                 <Share2 size={16} />
               </a>
               <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareMessage())}`} target="_blank" rel="noreferrer" className="ott-link-card">
                 <span className="ott-platform-name">Share on WhatsApp</span>
                 <Share2 size={16} />
               </a>
               <a href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${movie.title} (${movie.year}) on Christopher Nolan's Cinematic Portal crafted by x.com/itsanbuchelvan!`)}`} target="_blank" rel="noreferrer" className="ott-link-card">
                 <span className="ott-platform-name">Share on Telegram</span>
                 <Share2 size={16} />
               </a>
               <button 
                  onClick={() => { navigator.clipboard.writeText(getShareMessage()); alert('Message and link copied to clipboard!'); }} 
                  className="ott-link-card" 
                  style={{width: '100%', background: 'transparent', cursor: 'pointer', textAlign: 'left', outline: 'none'}}>
                 <span className="ott-platform-name">Copy Link & Message</span>
                 <Share2 size={16} />
               </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MovieDetail;

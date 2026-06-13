import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Music, Users, Camera, Clapperboard, Clock, Star, DollarSign, Info } from 'lucide-react';
import { movies } from '../data/movies';
import { useEffect } from 'react';
import React from 'react';

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

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
          
          {movie.whereToWatch && movie.whereToWatch.length > 0 && (
            <div className="where-to-watch">
              <h4>Where to Watch:</h4>
              <div className="watch-links">
                {movie.whereToWatch.map((platform, idx) => (
                  <a key={idx} href={platform.link} target="_blank" rel="noopener noreferrer" className="watch-platform">
                    {platform.platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          <Link to="/movies" className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Filmography</span>
          </Link>
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
                  <img src={actor.image} alt={actor.name} className="cast-image" />
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
              <div className="iframe-container">
                <iframe 
                  src={movie.soundtrack} 
                  title={`${movie.title} Soundtrack`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Photos Section */}
        {movie.photos && movie.photos.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title-sm"><Camera size={24} /> Gallery</h2>
            <div className="photos-grid">
              {movie.photos.map((photo, idx) => (
                <img key={idx} src={photo} alt={`${movie.title} scene ${idx}`} className="gallery-image" />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetail;

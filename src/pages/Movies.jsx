import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';

const Movies = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="movies-section"
    >
      <motion.h2 
        className="section-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Filmography
      </motion.h2>
      
      <motion.div 
        className="movies-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={itemVariants}>
            <Link to={`/movies/${movie.id}`}>
              <div className="movie-card">
                <img src={movie.image} alt={movie.title} className="movie-poster" />
                <div className="movie-overlay">
                  <h3 className="movie-title">{movie.title}</h3>
                  <span className="movie-year">{movie.year}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Movies;

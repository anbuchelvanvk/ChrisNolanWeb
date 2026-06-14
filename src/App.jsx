import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import About from './pages/About';
import ImaxExclusives from './pages/ImaxExclusives';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/imax" element={<ImaxExclusives />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <footer className="main-footer">
        <div className="footer-content">
          <p className="footer-copyright">© 2026 Anbuchelvan</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/movies">Filmography</Link>
            <Link to="/imax">IMAX</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-credit">Crafted for cinema lovers by <a href="https://twitter.com/itsanbuchelvan" target="_blank" rel="noopener noreferrer">@itsanbuchelvan</a></p>
        </div>
      </footer>
    </>
  );
}

export default App;

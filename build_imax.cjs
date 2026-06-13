const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('weebly_albums.json', 'utf8').replace(/^\uFEFF/, ''));

const interstellar = albums.find(a => a.id === 'interstellar');
if (interstellar && interstellar.images.length > 18) {
  // The first 18 images are all adjacent frames of the exact same dust storm scene.
  // We keep the very first one and drop the next 17.
  interstellar.images = [interstellar.images[0], ...interstellar.images.slice(18)];
}

const IMAX_VIDEOS = [
  { id: 1, title: "DUNKIRK - IMAX Footage", movie: "Dunkirk", url: "https://www.youtube.com/embed/09vrGJYUrlU", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 2, title: "THE DARK KNIGHT RISES - Trailer", movie: "The Dark Knight Rises", url: "https://www.youtube.com/embed/nh4QX1y8DUU", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 3, title: "THE DARK KNIGHT - Prologue", movie: "The Dark Knight", url: "https://www.youtube.com/embed/hsmDDY_MK84", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 4, title: "THE DARK KNIGHT RISES - Prologue", movie: "The Dark Knight Rises", url: "https://www.youtube.com/embed/buc8Kb4GG78", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 5, title: "INTERSTELLAR - Wormhole", movie: "Interstellar", url: "https://www.youtube.com/embed/5c0hMmW8Bw0", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 6, title: "TENET - Opening Scene", movie: "Tenet", url: "https://www.youtube.com/embed/VrBLl1IVsA0", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 7, title: "THE DARK KNIGHT RISES - Bomb Scene", movie: "The Dark Knight Rises", url: "https://www.youtube.com/embed/hAs1V9n4UIs", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" },
  { id: 8, title: "INTERSTELLAR - Ending Scene", movie: "Interstellar", url: "https://www.youtube.com/embed/b4FMd6A4wos", type: "youtube", description: "Scan from 15/70mm IMAX film print. Edges and perforations have not been cropped.", aspect: "1.43:1" }
];

const fileContent = `import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const IMAX_VIDEOS = ${JSON.stringify(IMAX_VIDEOS, null, 2)};

const IMAX_ALBUMS = ${JSON.stringify(albums, null, 2)};

const ImaxExclusives = () => {
  const [activeTab, setActiveTab] = useState('scans');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1.43/1');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="imax-exclusives-section"
      style={{ minHeight: '100vh', padding: '10rem 5% 5rem', maxWidth: '1400px', margin: '0 auto' }}
    >
      <motion.div 
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">IMAX Fan Archives</h2>
        <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Explore genuine 70mm IMAX film scans, behind-the-scenes footage, and exclusive media directly from the ultimate fan archives. 
        </p>

        {/* Toggle Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <button 
            onClick={() => { setActiveTab('scans'); setSelectedAlbum(null); }}
            style={{ 
              padding: '10px 30px', 
              background: activeTab === 'scans' ? 'var(--accent-color)' : 'transparent',
              color: activeTab === 'scans' ? '#000' : '#fff',
              border: '2px solid var(--accent-color)',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
          >
            Film Scans
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            style={{ 
              padding: '10px 30px', 
              background: activeTab === 'videos' ? 'var(--accent-color)' : 'transparent',
              color: activeTab === 'videos' ? '#000' : '#fff',
              border: '2px solid var(--accent-color)',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
          >
            Video Archive
          </button>
        </div>
      </motion.div>

      {/* Conditionally Render Sections */}
      {activeTab === 'scans' ? (
        <motion.div 
          key="scans"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '6rem' }}
        >
          {!selectedAlbum ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
                Albums
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem' 
              }}>
                {IMAX_ALBUMS.map((album, idx) => (
                  <motion.div
                    key={album.id}
                    onClick={() => setSelectedAlbum(album)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #333',
                      background: '#0a0a0a',
                      cursor: 'pointer',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                      <img src={album.thumbnail} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.8)', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem', color: '#aaa' }}>
                        {album.images.length} SCANS
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <h3 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{album.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button 
                onClick={() => setSelectedAlbum(null)}
                style={{ background: 'transparent', color: '#fff', border: '1px solid #333', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                &larr; Back to Albums
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
                {selectedAlbum.title} Scans
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {selectedAlbum.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => { setSelectedImage(img); setAspectRatio('1.43/1'); }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #333',
                      background: '#000',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                      height: '200px'
                    }}
                  >
                    <img src={img} alt={\`Scan \${idx + 1}\`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          key="videos"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
            Uncropped Video Archive
          </h2>
          <div className="video-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '4rem' 
          }}>
            {IMAX_VIDEOS.map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ 
                  background: 'rgba(10, 10, 10, 0.9)', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', borderBottom: '4px solid var(--accent-color)', backgroundColor: '#000' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe 
                      src={video.url} 
                      title={video.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--accent-color)',
                    color: 'var(--accent-color)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    backdropFilter: 'blur(5px)',
                    pointerEvents: 'none'
                  }}>
                    {video.aspect}
                  </div>
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.8rem', 
                    marginBottom: '0.5rem',
                    color: '#fff',
                    letterSpacing: '2px'
                  }}>
                    {video.title}
                  </h3>
                  <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {video.movie}
                  </p>
                  <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Fullscreen Image Modal with Aspect Ratio Toggle */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(0,0,0,0.95)', 
              zIndex: 9999, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <button 
              onClick={() => setSelectedImage(null)} 
              style={{ position: 'absolute', top: 30, right: 40, background: 'transparent', color: '#fff', border: 'none', fontSize: '3rem', cursor: 'pointer', zIndex: 10001 }}
            >
              &times;
            </button>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', zIndex: 10 }}>
              {[{label: '70mm IMAX (1.43:1)', val: '1.43/1'}, {label: 'Digital IMAX (1.90:1)', val: '1.9/1'}, {label: 'Standard Crop (2.39:1)', val: '2.39/1'}].map(ratio => (
                <button
                  key={ratio.val}
                  onClick={() => setAspectRatio(ratio.val)}
                  style={{
                    padding: '10px 25px',
                    background: aspectRatio === ratio.val ? 'var(--accent-color)' : 'transparent',
                    color: aspectRatio === ratio.val ? '#000' : '#fff',
                    border: '2px solid var(--accent-color)',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem'
                  }}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
            
            <div style={{ 
              width: '90%', 
              maxWidth: '1200px', 
              height: '75vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src={selectedImage} 
                  alt="Enlarged Scan" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: aspectRatio,
                    objectFit: 'cover',
                    transition: 'aspect-ratio 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
                  }} 
                />
              </div>
            </div>
            <p style={{ marginTop: '2rem', color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>
              Notice how the image physically crops down from its native 1.43:1 format.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ textAlign: 'center', marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          Showcasing the definitive 1.43:1 experience.
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Credits and Media provided by <a href="https://15perf70.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>15perf70.com</a> and <a href="https://70mmfilmcellar.weebly.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>70mmfilmcellar.weebly.com</a>.
        </p>
      </div>
    </motion.div>
  );
};

export default ImaxExclusives;
`;

fs.writeFileSync('src/pages/ImaxExclusives.jsx', fileContent);
console.log('Successfully rebuilt ImaxExclusives.jsx');

import React, { useState, useRef } from 'react';
import { 
  Calendar, MapPin, ExternalLink, Instagram, Mail, 
  Music, User, Image as ImageIcon, 
  Play, Pause, SkipForward, SkipBack // Import Play/Pause icons
} from 'lucide-react';
import bgMusic from './assets/bg-music.png';
import bgBio from './assets/bg-photos.jpg';
import bgPhotos from './assets/bg-bio.jpg';
import logo from './assets/logo.jpg';
import mySong from './assets/watchOutM2.wav'

const EPK = () => {
  const [activeTab, setActiveTab] = useState('music');

  // --- CONFIGURATION ---
  const backgrounds = {
    music: bgMusic,
    bio: bgBio,
    photos: bgPhotos
  };
  // Custom SoundCloud Icon Component
const SoundCloudIcon = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" /* This ensures it uses your CSS link color */
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.56 8.87V17h-1.38v-8.13h1.38zm-2.77 1.45v6.68H7.42v-6.68h1.37zm-2.76 1.83v4.85H4.65v-4.85h1.38zm13.6 2.6c0-2.3-1.87-4.17-4.17-4.17-.37 0-.72.06-1.06.15V8.58c0-.6-.48-1.08-1.08-1.08-.18 0-.34.05-.5.12V5.13c0-.6-.48-1.1-1.1-1.1-.14 0-.28.03-.4.08V2.5c0-.6-.46-1.1-1.07-1.1-.6 0-1.1.5-1.1 1.1v14.48h13.5c2.3 0 4.16-1.87 4.16-4.17 0-2.26-1.83-4.13-4.08-4.17z" />
  </svg>
);

  const shows = [
    { date: 'TBA', venue: 'TTBA', city: 'Los TBA, CA', link: '#' },
    { date: 'TBA', venue: 'TBA', city: 'San TBA, CA', link: '#' },
    { date: 'TBA', venue: 'TBA', city: 'TBA, NY', link: '#' },
  ];

  // Auto-import gallery photos. 
  // If this crashes, ensure the folder 'src/assets/gallery' exists.
  const imagesGlob = import.meta.glob('./assets/gallery/*.{png,jpg,jpeg}', { eager: true });
  const galleryPhotos = Object.values(imagesGlob).map(img => img.default);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference to the hidden audio tag

  // Replace this URL with your actual MP3 file path (e.g., import song from './assets/song.mp3')
  const songUrl = "./assets/watchOutM2.wav"; 

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="app-wrapper"
      style={{
        /* Dynamic Background Logic */
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgrounds[activeTab]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s ease-in-out',
        minHeight: '100vh',
        width: '100%',
        paddingBottom: '120px' 
      }}
    >
      <div className="content-container">
        
        {/* --- HEADER --- */}
        <header className="hero">
          <div className="hero-content">
            <img src={logo} alt="Artist Logo" className="artist-logo" />
            <p className="tagline">NEW TRACK "Watch OUT" OUT NOW</p>
            <div className="social-links">
              <a href="#" className="icon-link"><Instagram size={24} /></a>
              <a href="https://soundcloud.com/user-981388662" className="icon-link" target="_blank" rel="noreferrer">
                      <SoundCloudIcon size={24} /></a>              
              <a href="#" className="icon-link"><Mail size={24} /></a>
            </div>
          </div>
        </header>

        {/* --- TABS --- */}
        <nav className="nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'music' ? 'active' : ''}`} 
            onClick={() => setActiveTab('music')}
          >
            <Music size={18} /> MUSIC
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`} 
            onClick={() => setActiveTab('bio')}
          >
            <User size={18} /> BIO
          </button>
          <button 
            className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('photos')}
          >
            <ImageIcon size={18} /> PHOTOS
          </button>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="main-content">
          
          {/* 1. MUSIC TAB */}
          {activeTab === 'music' && (
            <div className="tab-content fade-in">
              <section className="section-container">
                <h2 className="section-title">"insert some mix name here"</h2>
                <div className="media-wrapper">
                  <iframe 
                    className="responsive-iframe"
                    src="https://www.youtube.com/embed/rUYlemYiZcg?si=5KwQw3iofwo7kcK_" 
                    title="YouTube player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </section>

              <section className="section-container">
                <h2 className="section-title">UPCOMING SHOWS</h2>
                <div className="bulletin-board">
                  {shows.map((show, index) => (
                    <div key={index} className="show-card">
                      <div className="date-box">
                        <Calendar size={16} />
                        <span>{show.date}</span>
                      </div>
                      <div className="venue-info">
                        <strong>{show.venue}</strong>
                        <span className="city-text"><MapPin size={12} /> {show.city}</span>
                      </div>
                      <a href={show.link} className="ticket-btn">
                        TICKETS <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 2. BIO TAB */}
          {activeTab === 'bio' && (
            <div className="tab-content fade-in">
              <section className="bio-container">
                <h2 className="section-title">THE STORY</h2>
                <div className="bio-text">
                  <p>Hailing from the heart of Atlanta, Red.Hat. is a veteran of the electronic underground with over 14 years of 
                      dedicated craft behind the decks and in the studio. 
                        While Atlanta is often defined by its hip-hop roots, Red.Hat has carved out a distinct sonic lane, 
                        importing and evolving the high-energy sounds of 
                          the UK rave scene for a domestic audience.
                            </p>
                  <p>Red.Hat. represents the bridge between Atlanta’s deep bass culture and 
                    the foundational breakbeats of London’s underground.</p>
                </div>
              </section>
            </div>
          )}

        <div className="sticky-player">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={mySong} onEnded={() => setIsPlaying(false)} />
        
        <div className="player-track-info">
          <span className="player-title">Watch OUT</span>
          <span className="player-artist">Red.Hat.</span>
        </div>

        <div className="player-controls">
          <button className="control-btn secondary"><SkipBack size={20} /></button>
          
          <button className="control-btn primary" onClick={togglePlay}>
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="play-icon-offset" />}
          </button>
          
          <button className="control-btn secondary"><SkipForward size={20} /></button>
        </div>
      </div>

          {/* 3. PHOTOS TAB */}
          {activeTab === 'photos' && (
            <div className="tab-content fade-in">
              <section className="gallery-container">
                <h2 className="section-title">GALLERY</h2>
                {galleryPhotos.length > 0 ? (
                  <div className="photo-grid">
                    {galleryPhotos.map((src, index) => (
                      <div key={index} className="photo-item">
                        <img src={src} alt={`Gallery ${index}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{textAlign: 'center', padding: '2rem', color: '#888'}}>
                    <p>No photos found in src/assets/gallery</p>
                    <small>Add .jpg files to the folder to see them here.</small>
                  </div>
                )}
              </section>
            </div>
          )}

        </main>
        
        <footer className="footer">
          <p>&copy; 2020 I Need A Manager....MGMT....INC....LLC</p>
        </footer>
      </div>
    </div>
  );
};

export default EPK;
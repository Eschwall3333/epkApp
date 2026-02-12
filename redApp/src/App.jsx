import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Instagram, Twitter, Mail, Music, User, Image as ImageIcon } from 'lucide-react';
import bgMusic from './assets/bg-music.png';
import bgBio from './assets/bg-bio.jpg';
import bgPhotos from './assets/bg-photos.jpg';
import logo from './assets/logo.jpg';

const EPK = () => {
  const [activeTab, setActiveTab] = useState('music');

  // --- CONFIGURATION ---
  const backgrounds = {
    music: bgMusic,
    bio: bgBio,
    photos: bgPhotos
  };

  const shows = [
    { date: 'OCT 12', venue: 'The Echo', city: 'Los Angeles, CA', link: '#' },
    { date: 'OCT 15', venue: 'Brick & Mortar', city: 'San Francisco, CA', link: '#' },
    { date: 'NOV 02', venue: 'Baby\'s All Right', city: 'Brooklyn, NY', link: '#' },
  ];

  // Auto-import gallery photos. 
  // If this crashes, ensure the folder 'src/assets/gallery' exists.
  const imagesGlob = import.meta.glob('./assets/gallery/*.{png,jpg,jpeg}', { eager: true });
  const galleryPhotos = Object.values(imagesGlob).map(img => img.default);

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
        width: '100%'
      }}
    >
      <div className="content-container">
        
        {/* --- HEADER --- */}
        <header className="hero">
          <div className="hero-content">
            <img src={logo} alt="Artist Logo" className="artist-logo" />
            <p className="tagline">NEW ALBUM "NEON DREAMS" OUT NOW</p>
            <div className="social-links">
              <a href="#" className="icon-link"><Instagram size={24} /></a>
              <a href="#" className="icon-link"><Twitter size={24} /></a>
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
                <h2 className="section-title">LATEST RELEASE</h2>
                <div className="media-wrapper">
                  <iframe 
                    className="responsive-iframe"
                    src="https://www.youtube.com/embed/LXb3EKWsInQ" 
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
                  <p>From the underground scenes of East London to the main stages of LA...</p>
                  <p>"Neon Dreams" captures raw emotion with pristine production.</p>
                </div>
              </section>
            </div>
          )}

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
          <p>&copy; 2024 Artist Name Management</p>
        </footer>
      </div>
    </div>
  );
};

export default EPK;
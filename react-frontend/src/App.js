import React, { useState } from 'react';
import SubmitTicket from './components/SubmitTicket';
import TrackTickets from './components/TrackTickets';
import AllTicketsPeek from './components/AllTicketsPeek';

// Import the generated image
import heroImage from './assets/support_hero.png';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'submit', 'track'
  const [isPeekOpen, setIsPeekOpen] = useState(false);

  return (
    <div className="container">
      {/* Peek-a-boo Drawer */}
      <AllTicketsPeek isOpen={isPeekOpen} onClose={() => setIsPeekOpen(false)} />

      {view === 'landing' ? (
        <section className="hero-section">
          <header>
            <h1 className="gradient-text">Support Center</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              Submit a ticket or track your existing requests with ease.
            </p>
          </header>

          <div className="hero-image-container">
            <img
              src={heroImage}
              alt="Support Dashboard"
              className="hero-image"
            />
          </div>

          <div className="action-grid">
            <div className="action-card" onClick={() => setView('submit')}>
              <span className="action-icon">🚀</span>
              <h3>Generate Ticket</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Need help? Launch a request in seconds.</p>
              <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>Get Started</button>
            </div>

            <div className="action-card" onClick={() => setView('track')}>
              <span className="action-icon">🔍</span>
              <h3>Track Status</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Check the progress of your open tickets.</p>
              <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border)' }}>Find My Ticket</button>
            </div>
          </div>

          <button
            className="btn-ghost"
            onClick={() => setIsPeekOpen(true)}
          >
            👀 Peek at Recent Activity
          </button>
        </section>
      ) : (
        <div className="content-view">
          <button className="btn-ghost" onClick={() => setView('landing')} style={{ marginBottom: '2rem' }}>
            ← Back to Home
          </button>

          {view === 'submit' ? <SubmitTicket /> : <TrackTickets />}
        </div>
      )}

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>Built with <strong>React & Strapi</strong></p>
        <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>&copy; Ticketing System</p>
      </footer>
    </div>
  );
}

export default App;

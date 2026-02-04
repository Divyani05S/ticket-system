import React, { useState } from 'react';
import axios from 'axios';

const TrackTickets = () => {
    const [email, setEmail] = useState('');
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.trim()) {
            setError('Email is required');
            return;
        } else if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');
        setHasSearched(true);

        try {
            // Strapi 5 dynamic filtering
            const response = await axios.get(`http://localhost:1337/api/tickets?filters[email][$eq]=${email}`);
            setTickets(response.data.data);
        } catch (err) {
            console.error('Tracking error:', err);
            setError('Could not fetch tickets. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Helper to extract nested Strapi values safely
    const getVal = (item, key) => {
        return item[key] !== undefined ? item[key] : (item.attributes ? item.attributes[key] : null);
    };

    const StatusBadge = ({ status }) => {
        const cleanStatus = status || 'Open';
        let className = 'status-open';

        if (cleanStatus === 'In Progress') className = 'status-in-progress';
        if (cleanStatus === 'Resolved') className = 'status-resolved';

        return <span className={`badge ${className}`}>{cleanStatus}</span>;
    };

    const PriorityBadge = ({ priority }) => {
        // Handle backend typo "Meduim" for display
        const displayPriority = priority === 'Meduim' ? 'Medium' : (priority || 'Low');
        const className = `priority-${displayPriority.toLowerCase()}`;
        return <span className={`badge ${className}`}>{displayPriority}</span>;
    };

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Track Your Tickets</h2>

            <form onSubmit={handleTrack} style={{ marginBottom: '2.5rem' }}>
                <div className="form-group">
                    <label htmlFor="track-email">Email Address</label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                            type="email"
                            id="track-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter the email used for submission"
                        />
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', marginTop: 0, padding: '0 2rem' }}>
                            {loading ? <div className="spinner"></div> : 'Track'}
                        </button>
                    </div>
                </div>
            </form>

            {error && (
                <div className="alert alert-error">
                    <span>⚠</span> {error}
                </div>
            )}

            <div className="ticket-results">
                {loading ? (
                    <div className="empty-state">
                        <div className="spinner" style={{ margin: '0 auto 1rem', borderColor: 'var(--primary-glow)', borderTopColor: 'var(--primary)' }}></div>
                        <p>Searching for tickets...</p>
                    </div>
                ) : (
                    <>
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => {
                                const id = ticket.documentId || ticket.id;
                                const title = getVal(ticket, 'title');
                                const status = getVal(ticket, 'curr_status');
                                const priority = getVal(ticket, 'priority');
                                const description = getVal(ticket, 'description');

                                return (
                                    <div key={id} className="ticket-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{title}</h3>
                                            <StatusBadge status={status} />
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineClamp: '3', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                            <PriorityBadge priority={priority} />
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {id.slice(0, 8)}...</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            hasSearched && (
                                <div className="empty-state">
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                                    <p>No tickets found for this email.</p>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TrackTickets;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

const AllTicketsPeek = ({ isOpen, onClose }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchAll = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(API_ENDPOINTS.PEEK_TICKETS);
                    setTickets(response.data.data);
                } catch (err) {
                    console.error('Peek-a-boo error:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchAll();
        }
    }, [isOpen]);

    const getVal = (item, key) => {
        return item[key] !== undefined ? item[key] : (item.attributes ? item.attributes[key] : null);
    };

    if (!isOpen) return null;

    return (
        <div className="peek-overlay" onClick={onClose}>
            <div className="peek-drawer" onClick={e => e.stopPropagation()}>
                <div className="peek-header">
                    <h3>Recent Global Tickets</h3>
                    <button className="close-peek" onClick={onClose}>&times;</button>
                </div>

                <div className="peek-content">
                    {loading ? (
                        <div className="spinner-center"><div className="spinner"></div></div>
                    ) : (
                        tickets.map(t => (
                            <div key={t.id} className="peek-item">
                                <div className="peek-item-top">
                                    <span className="peek-title">{getVal(t, 'title')}</span>
                                    <span className={`peek-badge ${(getVal(t, 'priority') || 'Low').toLowerCase()}`}>
                                        {getVal(t, 'priority') || 'Low'}
                                    </span>
                                </div>
                                <div className="peek-email">{getVal(t, 'email')}</div>
                            </div>
                        ))
                    )}
                    {tickets.length === 0 && !loading && <p className="empty-peek">No tickets yet. Be the first!</p>}
                </div>
                <div className="peek-footer">Showing last 10 activities</div>
            </div>
        </div>
    );
};

export default AllTicketsPeek;

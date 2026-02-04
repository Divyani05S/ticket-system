import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

const SubmitTicket = () => {
    const [formData, setFormData] = useState({
        title: '',
        email: '',
        priority: 'Medium',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }

        // More robust email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.priority) {
            newErrors.priority = 'Priority is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear specific error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const payload = {
                data: formData
            };

            await axios.post(API_ENDPOINTS.TICKETS, payload);

            setStatus({ type: 'success', message: 'Ticket submitted successfully!' });
            setFormData({ title: '', email: '', priority: 'Medium', description: '' });
            setErrors({});

            // Auto-clear success message after 5s
            setTimeout(() => setStatus({ type: '', message: '' }), 7000);

        } catch (error) {
            console.error('Submission error:', error);
            console.error('Error details:', error.response?.data); // Log full details

            // Extract Strapi error message
            const serverMessage = error.response?.data?.error?.message ||
                error.response?.data?.message || // Fallback for some versions
                'Unable to submit ticket. Please try again later.';

            setStatus({
                type: 'error',
                message: serverMessage
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create New Ticket</h2>

            {status.message && (
                <div className={`alert alert-${status.type}`}>
                    <span>{status.type === 'success' ? '✓' : '⚠'}</span>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Brief summary of the issue"
                        style={errors.title ? { borderColor: 'var(--error)' } : {}}
                    />
                    {errors.title && <div className="validation-error">{errors.title}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        style={errors.email ? { borderColor: 'var(--error)' } : {}}
                    />
                    {errors.email && <div className="validation-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority Level</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Detailed Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Please provide steps to reproduce or more details..."
                        style={errors.description ? { borderColor: 'var(--error)' } : {}}
                    ></textarea>
                    {errors.description && <div className="validation-error">{errors.description}</div>}
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Submit Ticket'}
                </button>
            </form>
        </div>
    );
};

export default SubmitTicket;

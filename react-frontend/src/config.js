const isProduction = process.env.NODE_ENV === 'production';
const API_URL = process.env.REACT_APP_API_URL || (isProduction ? 'https://ticket-backend1.onrender.com' : 'http://localhost:1337');

export const API_ENDPOINTS = {
    TICKETS: `${API_URL}/api/tickets`,
    GET_TICKET: (email) => `${API_URL}/api/tickets?filters[email][$eq]=${email}`,
    PEEK_TICKETS: `${API_URL}/api/tickets?sort=createdAt:desc&pagination[limit]=10`,
};

export default API_URL;

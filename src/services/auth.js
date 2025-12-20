import api from './api';

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/api/v1/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/api/v1/auth/register', {
            name,
            email,
            password,
        });
        return response.data;
    },

    guestLogin: async () => {
        const response = await api.post('/api/v1/auth/guest');
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/api/v1/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/api/v1/auth/me');
        return response.data;
    },
};

export default authService;

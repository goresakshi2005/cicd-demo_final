import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
};

export const products = {
    list: () => api.get('/products'),
    get: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
};

export const orders = {
    create: (items) => api.post('/orders', { items }),
    list: () => api.get('/orders'),
};

export default api;
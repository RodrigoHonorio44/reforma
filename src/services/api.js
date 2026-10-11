import axios from 'axios';

// Puxa a URL da variável de ambiente do Vite (com fallback seguro para produção)
export const API_URL = import.meta.env.VITE_API_URL || 'https://api-reforma.rodhonsystem.com.br';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
export default API_URL;
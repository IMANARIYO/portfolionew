import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: 'https://myportfolioapi-8vku.onrender.com', // Change this to your actual production server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

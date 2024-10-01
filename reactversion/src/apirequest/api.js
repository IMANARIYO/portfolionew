import axios from "axios";

// api.js

const api = axios.create({
  baseURL: 'https://myportfolioapi-8vku.onrender.com', // Change this to your actual production server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add bearer token for authorized requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;

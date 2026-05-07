import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (username, email, password) => 
    api.post('/auth/register', { username, email, password }),
  
  verifyToken: (token) => 
    api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } }),
};

export const storiesAPI = {
  getStories: (page = 1, limit = 10) => 
    api.get(`/stories?page=${page}&limit=${limit}`),
  
  getStory: (id) => 
    api.get(`/stories/${id}`),
  
  toggleBookmark: (id) => 
    api.post(`/stories/${id}/bookmark`),
  
  getBookmarks: () => 
    api.get('/stories/bookmarks'),
};

export const scrapeAPI = {
  scrape: () => 
    api.post('/scrape'),
};

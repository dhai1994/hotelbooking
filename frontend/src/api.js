// src/api.js
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000/api"
    : window.location.origin + "/api");


const api = axios.create({
  baseURL,
  withCredentials: true, // only needed if you use cookies
});

// tokenProvider is set at runtime by your AppProvider (so we can call getToken from Clerk)
let tokenProvider = null;
export const setTokenProvider = (providerFn) => { tokenProvider = providerFn; };

// Async request interceptor to add Authorization header when a provider exists
api.interceptors.request.use(async (config) => {
  if (tokenProvider) {
    try {
      const token = await tokenProvider();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore token attach errors - request can still go out (or backend will reject)
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

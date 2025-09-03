import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', 
});

// Adding a request interceptor for token authorization (if applicable)
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;

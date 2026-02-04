import axios from 'axios';
const url = import.meta.env.VITE_API_URLPOKE;
const api = axios.create({
 // baseURL: 'https://pokeapi.co/api/v2',
  baseURL: url,
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
});
export default api;
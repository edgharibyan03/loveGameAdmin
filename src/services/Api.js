import axios from 'axios';

const API = axios.create({
  baseURL: 'http://annaniks.com:5555',
  responseType: 'json',
  timeout: 1000,
});

export default API;
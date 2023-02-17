import axios from 'axios';
import keys from 'src/utils/keys';

const API = axios.create({
  baseURL: keys.SERVER_URL,
  responseType: 'json',
  timeout: 1000,
});

export default API;

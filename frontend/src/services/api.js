import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.1.18.235:8080/api'
});

export default api;
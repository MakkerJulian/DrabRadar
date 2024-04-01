import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000', 
    timeout: 5000, 
    proxy: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + sessionStorage.getItem('token') || '',
    }
});

export default axiosInstance;

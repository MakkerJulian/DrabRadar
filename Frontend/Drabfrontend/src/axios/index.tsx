import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000', 
    timeout: 5000, 
    proxy: false,
});

export default axiosInstance;

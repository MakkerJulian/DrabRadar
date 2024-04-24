import axios, { AxiosInstance } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { redirect } from 'react-router-dom';


const loginInstance: AxiosInstance = axios.create({
    baseURL: `http://${import.meta.env.VITE_APP_URL ?? "localhost"}:3000`,
    timeout: 5000,
    proxy: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export type Token = JwtPayload & {
    email: string;
    role : string;
}

const token = () => {
    const sessiontoken = localStorage.getItem('token');
    if (!sessiontoken) {
        redirect('/login');
    } else {
        const exp = jwtDecode(sessiontoken).exp ?? 0;
        const email = (jwtDecode(sessiontoken) as unknown as Token).email ?? "";
        const current_time = Date.now().valueOf() / 1000;
        if (current_time > exp) {
            const pw = localStorage.getItem('pw');
            loginInstance.post('/account/login', { email: email, password: pw }).then((res) => {
                localStorage.setItem('token', res.data.access_token);
                return res.data.access_token;
            });
        }
    }
    return sessiontoken;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://${import.meta.env.VITE_APP_URL ?? "localhost"}:3000`,
    timeout: 5000,
    proxy: false
})

axiosInstance.interceptors.request.use((config) => {
	const accessToken = token();

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
}, error => Promise.reject(error));

export default axiosInstance;



import axios, { AxiosError } from 'axios';
import SweatAlert from '../utils/alert';


const axiosInstance = axios.create({
    baseURL: 'https://localhost:44349/',
    // baseURL: 'https://gateway.flaveconsole.com/',
    timeout: 1000000,
    headers: {
        Authorization: '',
    },
})

axiosInstance.interceptors.response.use((response: any) => response, (error: AxiosError) => {
    if (!error.response) {
        return;
    }
    if (error.response?.status === 500) {
        console.log("Unexpected error occurred");
        SweatAlert.showError(error!.response!.data['message'], "Unexpected error occurred")
    }
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userDetail');
    }
    throw error;
});

axiosInstance.interceptors.response.use(async (response: any) => response, (error: any) => {
    if (!error.response) {
        return;
    }

    if (error?.response?.status === 500) {
        console.log('error.response', error.response)
        return error.response
    }

    if (error?.response?.status === 404) {
        console.log('error.response', error.response)
        return error.response
    }
    throw error;
});

axiosInstance.interceptors.request.use(
    async (config: any) => {
        const sessionToken = await localStorage.getItem('token');


        if (sessionToken) {
            config.headers.Authorization = 'Bearer ' + sessionToken
            return config;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
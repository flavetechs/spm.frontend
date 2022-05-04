import axios from 'axios';
//  http://sub.vendtechsl.com/',
const axiosInstance = axios.create({
    baseURL: 'https://localhost:44373/',
    headers: {
        Authorization: '',
    },
});

axiosInstance.interceptors.response.use((response) => response, (error: any) => { 
    if(error.response.status === 401){
        console.log('aunthorized');
        localStorage.removeItem('token');
    }
    throw error;
});

axiosInstance.interceptors.response.use((response) => response, (error: any) => { 
    if(error.response.status === 500){
        console.log('error.response', error.response)
    }
    throw error;
});

axiosInstance.interceptors.request.use(
    async (config: any) => {

        const sessionToken = await localStorage.getItem('token');

        if (sessionToken !== null) {
            config.headers.Authorization = 'Bearer ' + sessionToken
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
import axios from 'axios';
//https://localhost:44373/,
// http://flavetech-001-site3.etempurl.com/
const axiosInstance = axios.create({
    baseURL: 'http://flavetechs.com/smp/development/',
    // baseURL: 'https://localhost:44373/',
    headers: {
        Authorization: '',
    },
});

axiosInstance.interceptors.response.use((response: any) => response, (error: any) => { 
    if(error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userDetail');
    }
    throw error;
});

axiosInstance.interceptors.response.use((response: any) => response, (error: any) => { 
    if(error.response.status === 500){
        console.log('error.response', error.response)
    }
    if(error.response.status === 404){
        console.log('error.response', error.response)
        return
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
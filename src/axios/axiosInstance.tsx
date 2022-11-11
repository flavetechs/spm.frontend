import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://flavetechs.com/smp/development/' : "http://flavetechs.com/smp/staging/",
    // baseURL: 'https://localhost:44373/',
    // baseURL: 'https://localhost:44349/smp/development/',
    headers: {
        Authorization: '',
    },
});

axiosInstance.interceptors.response.use((response: any) => response, (error: any) => { 
    console.log('error.response', error);
    if(!error.response){
        return;
    }
    if(error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userDetail');
    }
    throw error;
});

axiosInstance.interceptors.response.use(async (response: any) => response, (error: any) => { 
    if(!error.response){
        return;
    }
    if(error?.response?.status === 500){
        console.log('error.response', error.response)
        return error.response
    }
    if(error?.response?.status === 404){
        console.log('error.response', error.response)
        return error.response
    }
    throw error;
    // return error.response
});

axiosInstance.interceptors.request.use(
    async (config: any) => {
        // const dispatch = useDispatch();
        // const online = navigator.onLine;
        // debugger
        // if(online){
            
        //     // showErrorToast('No Internet Connection')(dispatch);
        //     // alert('online');
        //     return config;
        // }
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
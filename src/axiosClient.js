import axios from 'axios';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST
});
axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `${localStorage.getItem('token')}`;
    return config;
}, (err)=>{
    return Promise.reject(err);
});
export default axiosClient;
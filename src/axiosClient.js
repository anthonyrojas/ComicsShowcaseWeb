import axios from 'axios';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST
});
axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
}, (err)=>{
    console.error(err);
});
export default axiosClient;
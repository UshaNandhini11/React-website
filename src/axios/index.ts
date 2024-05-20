import axios from "axios";
import { refreshToken } from "../service/auth";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// Add a response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             try {
//                 originalRequest._retry = true;
//                 const newToken = await refreshToken();
//                 const refresh_token = newToken.token;
//                 localStorage.setItem('token', refresh_token)
//                 originalRequest.headers.common[
//                     "Authorization"
//                 ] = `Bearer ${refresh_token}`;
//                 return axiosInstance(originalRequest);
//             } catch (error) {
//                 console.log("Error in refresh token:::" + error)
//             }
//         }
//         return Promise.reject(error);
//     }
// );
export default axiosInstance;

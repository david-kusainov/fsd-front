import axios from "axios";
import Cookies from 'js-cookie';

export const $api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
})

$api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const $apiImages = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + Cookies.get('token'),
    "Content-Type": "multipart/form-data",
  },
})

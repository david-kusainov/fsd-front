import axios from "axios";
import Cookies from 'js-cookie';

export const $api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + Cookies.get('token'),
  },
})

import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000';

export const axiosAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
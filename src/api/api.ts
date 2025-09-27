import axios from 'axios'
import { API_DOMAIN } from '../config/constants'

export const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials:true
  //baseURL: 'https://ctp-hojancha-backend.onrender.com/',
})

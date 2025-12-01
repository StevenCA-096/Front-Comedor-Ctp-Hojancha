import { API_DOMAIN } from '@/config/constants'
import axios from 'axios'

export const api = axios.create({
 baseURL: API_DOMAIN,
  withCredentials:true
  
})

import axios from 'axios'

export const api = axios.create({
 baseURL: 'https://ctp-hojancha-backend.onrender.com/',
  withCredentials:true
  
})

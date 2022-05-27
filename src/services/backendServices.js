import config from '@/config'
import axios from 'axios'

export const backendServices = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000,
})

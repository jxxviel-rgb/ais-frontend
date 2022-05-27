import config from '@/config'
import { backendServices } from './backendServices'

export default {
  login,
  loggingIn,
  authHeader,
  getAuhtData,
}

function login(username, password) {
  const data = new FormData()
  data.append(`email`, username)
  data.append(`password`, password)

  return backendServices.post('/auth/login', data)
}

function loggingIn(authData) {
  localStorage.setItem(config.authData, JSON.stringify(authData))
}

function authHeader() {
  const raw = localStorage.getItem(config.authData)
  if (!raw) {
    return {}
  }
  const autData = JSON.parse(raw)
  return { Authorization: `Bearer ${autData.access_token}` }
}

function getAuhtData() {
  const raw = localStorage.getItem(config.authData)
  if (!raw) {
    return {}
  }
  return JSON.parse(raw)
}

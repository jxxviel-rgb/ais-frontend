import { backendServices } from '@/services/backendServices'
import authServices from '@/services/authServices'
import qs from 'qs'

function dataIndex(path, query) {
  const params = query ? qs.stringify(query) : ''
  const option = {
    method: 'GET',
    headers: authServices.authHeader(),
    url: `${path}/?${params}`,
  }
  return backendServices(option)
}

function dataCreate(path, data) {
  const options = {
    method: 'POST',
    headers: authServices.authHeader(),
    data: data,
    url: path,
  }
  return backendServices(options)
}

function dataUpdate(path, id, data) {
  const options = {
    method: 'PUT',
    headers: authServices.authHeader(),
    data: data,
    url: `${path}/${id}`,
  }
  return backendServices(options)
}

function dataDelete(path, id) {
  const options = {
    method: 'DELETE',
    headers: authServices.authHeader(),
    url: `${path}/${id}`,
  }
  return backendServices(options)
}

export default {
  dataIndex,
  dataCreate,
  dataUpdate,
  dataDelete,
}

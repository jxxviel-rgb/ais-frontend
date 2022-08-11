import { backendServices } from '@/services/backendServices'
import authServices from '@/services/authServices'
import qs from 'qs'

function dataIndex(path, query) {
  const params = query ? qs.stringify(query) : ''
  const option = {
    method: 'GET',
    headers: authServices.authHeader(),
    url: `${path}${query ? '/?' + params : ''}`,
  }
  return backendServices(option)
}

function dataCreate(path, data, withfile = false) {
  let headers = {}
  if(withfile) {
    headers = {
      ...authServices.authHeader(),
      'Content-Type': 'multipart/form-data'
    }
  } else {
    headers = authServices.authHeader()
  }
  
  const options = {
    method: 'POST',
    headers,
    data: data,
    url: path,
  }
  return backendServices(options)
}

function dataUpdate(path, id, data, withfile = false) {
  let headers = {}
  if(withfile) {
    headers = {
      ...authServices.authHeader(),
      'Content-Type': 'multipart/form-data'
    }
  } else {
    headers = authServices.authHeader()
  }
  
  const options = {
    method: 'PUT',
    headers,
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

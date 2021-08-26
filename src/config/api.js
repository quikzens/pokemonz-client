import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

export const configFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const configJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}

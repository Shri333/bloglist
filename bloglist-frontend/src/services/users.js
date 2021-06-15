import axios from 'axios'

const baseUrl = ''

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/api/login`, {
    username,
    password,
  })
  return response.data
}

const register = async (username, name, password) => {
  const response = await axios.post(`${baseUrl}/api/users`, {
    username,
    name,
    password,
  })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/users`)
  return response.data
}

const userService = { login, register, getAll }
export default userService

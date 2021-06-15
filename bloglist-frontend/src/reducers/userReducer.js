import { notify } from './notificationReducer'
import userService from '../services/users'

const login = (username, password) => async dispatch => {
  try {
    const user = await userService.login(username, password)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      data: { user },
    })
    dispatch(notify('Login successful', 1))
  } catch (error) {
    dispatch(notify(error.response.data, 0))
  }
}

const register = (username, name, password) => async dispatch => {
  try {
    const newUser = await userService.register(username, name, password)
    const user = await userService.login(username, password)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      data: { user },
    })
    dispatch({
      type: 'CREATE_USER',
      data: { user: newUser },
    })
    dispatch(notify(`${username} - ${name} registered successfuly`, 1))
    return user
  } catch (error) {
    dispatch(notify(error.response.data, 0))
  }
}

const logout = () => dispatch => {
  localStorage.clear()
  dispatch({
    type: 'LOGOUT',
  })
  dispatch(notify('Logout successful', 1))
}

const userReducer = (
  state = JSON.parse(localStorage.getItem('user')),
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export { login, register, logout }
export default userReducer

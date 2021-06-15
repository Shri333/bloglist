import userService from '../services/users'

const initUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch({
    type: 'INIT_USERS',
    data: { users },
  })
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.users
    case 'CREATE_USER':
      return state.concat(action.data.user)
    case 'CREATE_BLOG': {
      const blog = { ...action.data.blog, user: undefined }
      return state.map(user => {
        if (user.id === action.data.blog.user.id) {
          user.blogs = user.blogs.concat(blog)
        }
        return user
      })
    }
    case 'LIKE_BLOG':
    case 'COMMENT_BLOG': {
      const blog = { ...action.data.blog, user: undefined }
      return state.map(user => {
        if (user.id === action.data.blog.user.id) {
          user.blogs = user.blogs.map(b => (b.id === blog.id ? blog : b))
        }
        return user
      })
    }
    case 'REMOVE_BLOG': {
      return state.map(user => {
        user.blogs = user.blogs.filter(b => b.id !== action.data.blog.id)
        return user
      })
    }
    default:
      return state
  }
}

export { initUsers }
export default usersReducer

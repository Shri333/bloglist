import { notify } from './notificationReducer'
import blogService from '../services/blogs'

const initBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'INIT_BLOGS',
    data: { blogs },
  })
}

const create = (title, author, url, token) => async dispatch => {
  try {
    const blog = await blogService.postNew(title, author, url, token)
    dispatch({
      type: 'CREATE',
      data: { blog },
    })
    dispatch({
      type: 'CREATE_BLOG',
      data: { blog },
    })
    dispatch(notify(`${blog.title} added`, 1))
    return blog.id
  } catch (error) {
    dispatch(notify(error.response.data, 0))
  }
}

const like = (id, likes, token) => async dispatch => {
  const blog = await blogService.updateLikes(id, likes, token)
  dispatch({
    type: 'LIKE',
    data: { blog },
  })
  dispatch({
    type: 'LIKE_BLOG',
    data: { blog },
  })
  dispatch(notify(`liked ${blog.title}`, 1))
}

const comment = (id, comment) => async dispatch => {
  try {
    const blog = await blogService.addComment(id, comment)
    dispatch({
      type: 'COMMENT',
      data: { blog },
    })
    dispatch({
      type: 'COMMENT_BLOG',
      data: { blog },
    })
    dispatch(notify(`commented ${comment}`, 1))
  } catch (error) {
    dispatch(notify(error.response.data, 0))
  }
}

const remove = (blog, token) => async dispatch => {
  await blogService.deleteBlog(blog.id, token)
  dispatch({
    type: 'REMOVE',
    data: { blog },
  })
  dispatch({
    type: 'REMOVE_BLOG',
    data: { blog },
  })
  dispatch(notify(`deleted ${blog.title}`, 1))
}

const blogsReducer = (state = [], action) => {
  let newState
  switch (action.type) {
    case 'INIT_BLOGS':
      newState = action.data.blogs
      break
    case 'CREATE':
      newState = state.concat(action.data.blog)
      break
    case 'LIKE':
    case 'COMMENT':
      newState = state.map(blog =>
        blog.id === action.data.blog.id ? action.data.blog : blog
      )
      break
    case 'REMOVE':
      newState = state.filter(blog => blog.id !== action.data.blog.id)
      break
    default:
      return state
  }
  return newState.sort((a, b) => b.likes - a.likes)
}

export { initBlogs, create, like, comment, remove }
export default blogsReducer

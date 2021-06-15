import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { initUsers } from './reducers/usersReducer'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Notification from './components/Notification'
import Login from './components/Login'
import Register from './components/Register'
import Navigation from './components/Navigation'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import CommentForm from './components/CommentForm'
import NotFound from './components/NotFound'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  const blogFormRef = useRef()
  const commentFormRef = useRef()

  const closeBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const closeCommentForm = () => {
    commentFormRef.current.toggleVisibility()
  }

  if (user) {
    return (
      <Container>
        <Notification />
        <Switch>
          <Route path='/blogs/:id'>
            <Navigation />
            <Blog />
            <Togglable label='Add Comment' ref={commentFormRef}>
              <CommentForm handleClose={closeCommentForm} />
            </Togglable>
          </Route>
          <Route path='/users/:id'>
            <Navigation />
            <User />
          </Route>
          <Route path='/users'>
            <Navigation />
            <Users />
          </Route>
          <Route path='/' exact>
            <Navigation />
            <Blogs />
            <Togglable label='Create New Blog' ref={blogFormRef}>
              <BlogForm handleClose={closeBlogForm} />
            </Togglable>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    )
  }

  return (
    <Container>
      <Notification />
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  )
}

export default App

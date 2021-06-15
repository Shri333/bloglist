import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Link, useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => {
    if (state.users.length) {
      return state.users.find(user => user.id === id)
    }
    return null
  })

  if (user === undefined) {
    return <Redirect to='/users' />
  }

  if (user === null) {
    return null
  }

  return (
    <div className='mt-3'>
      <h3 style={{ textAlign: 'center' }}>{user.name}</h3>
      <ListGroup className='mt-3'>
        {user.blogs.map(blog => (
          <ListGroup.Item
            key={blog.id}
            as={Link}
            to={`/blogs/${blog.id}`}
            style={{ color: 'dimgray', textAlign: 'center' }}
          >
            {blog.title} by {blog.author}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User

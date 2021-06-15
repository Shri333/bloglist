import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <ListGroup className='mt-3'>
      {blogs.map(blog => (
        <ListGroup.Item
          key={blog.id}
          as={Link}
          to={`/blogs/${blog.id}`}
          style={{ color: 'dimgray' }}
        >
          {blog.title} by {blog.author}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Blogs

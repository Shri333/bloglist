import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Link to='/'>
        <Navbar.Brand>Bloglist</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to='/users'>
            users
          </Nav.Link>
        </Nav>
        <Navbar.Text className='mr-3'>{user.name} logged in</Navbar.Text>
        <Button variant='outline-secondary' onClick={handleLogout}>
          logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation

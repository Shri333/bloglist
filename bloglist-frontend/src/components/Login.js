import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = event => {
    event.preventDefault()
    dispatch(login(username, password)).then(() => {
      setUsername('')
      setPassword('')
      history.push('/')
    })
  }

  return (
    <Row>
      <Col></Col>
      <Col className='mt-5'>
        <h1 className='mb-3' style={{ textAlign: 'center' }}>
          Login
        </h1>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Control
              className='username'
              placeholder='Enter username'
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className='password'
              placeholder='Enter password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant='dark' type='submit' block>
            Login
          </Button>
        </Form>
        <p className='text-muted mt-3' style={{ textAlign: 'center' }}>
          Don't have an account? Sign up <Link to='/register'>here</Link>
        </p>
      </Col>
      <Col></Col>
    </Row>
  )
}

export default Login

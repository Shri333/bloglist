import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      textAlign: 'center'
    }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>Go Back <Link to='/'>Home</Link></p>
    </div>
  )
}

export default NotFound
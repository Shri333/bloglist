import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <Table className='mt-3' bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>
              <Link to={`/users/${user.id}`} style={{ color: 'black' }}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Users

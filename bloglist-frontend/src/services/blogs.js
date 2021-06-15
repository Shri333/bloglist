import axios from 'axios'

const baseUrl = ''

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/blogs`)
  return response.data
}

const postNew = async (title, author, url, token) => {
  const response = await axios.post(
    `${baseUrl}/api/blogs`,
    { title, author, url },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

const updateLikes = async (id, likes, token) => {
  const response = await axios.patch(
    `${baseUrl}/api/blogs/${id}`,
    { likes },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

const deleteBlog = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/api/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/api/blogs/${id}/comments`, {
    comment,
  })
  return response.data
}

const blogService = { getAll, postNew, updateLikes, deleteBlog, addComment }
export default blogService

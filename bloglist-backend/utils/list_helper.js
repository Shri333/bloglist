const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  let max = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > max.likes) {
      max = blogs[i]
    }
  }
  return max
}

const arrayMax = array => {
  let max = array[0]
  array.forEach(element => {
    if (element > max) {
      max = element
    }
  })
  return max
}

const mostBlogs = blogs => {
  const authors = []
  const numbers = []
  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      const index = authors.indexOf(blog.author)
      numbers[index]++
    } else {
      authors.push(blog.author)
      numbers.push(1)
    }
  })
  const index = numbers.indexOf(arrayMax(numbers))
  return { author: authors[index], blogs: numbers[index] }
}

const mostLikes = blogs => {
  const authors = []
  const likes = []
  blogs.forEach(blog => {
    if (authors.includes(blog.author)) {
      const index = authors.indexOf(blog.author)
      likes[index] += blog.likes
    } else {
      authors.push(blog.author)
      likes.push(blog.likes)
    }
  })
  const index = likes.indexOf(arrayMax(likes))
  return { author: authors[index], likes: likes[index] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

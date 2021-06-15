const tokenHandler = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = tokenHandler

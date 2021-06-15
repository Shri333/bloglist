const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).send(error._message)
  } else if (error.name === 'CastError') {
    response.status(400).send('Bad id')
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).send('Bad token')
  } else {
    next(error)
  }
  console.log(error.message)
}

module.exports = errorHandler

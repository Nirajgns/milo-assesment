export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (err.message === 'Email already in use...') {
    return res.status(409).json({ error: err.message })
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  })
}

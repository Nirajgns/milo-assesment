import express from 'express'
import connectDB from './config/db.js'
import userRouter from './module/user/user.routes.js'

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api/auth', userRouter)

const startServer = async (port) => {
  connectDB().then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port', port)
    })
  })
}

startServer(process.env.PORT || 3000)

import express from 'express'
import connectDB from './config/db.js'

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

const startServer = async (port) => {
  connectDB().then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port', port)
    })
  })
}

startServer(process.env.PORT || 3000)

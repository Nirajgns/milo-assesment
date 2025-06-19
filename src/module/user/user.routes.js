import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', (req, res) => {
  res.send('register')
})

userRouter.post('/login', (req, res) => {
  res.send('login')
})

export default userRouter

import { Router } from 'express'
import { createUserController } from './user.controller.js'
import { asyncWrapper } from '../../utils/asyncWrapper.js'

const userRouter = Router()

userRouter.post('/register', asyncWrapper(createUserController))

userRouter.post('/login', (req, res) => {
  res.send('login')
})

export default userRouter

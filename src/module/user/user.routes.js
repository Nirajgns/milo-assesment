import { Router } from 'express'
import { createUserController, loginController } from './user.controller.js'
import { asyncWrapper } from '../../utils/asyncWrapper.js'

const userRouter = Router()

userRouter.post('/register', asyncWrapper(createUserController))

userRouter.post('/login', asyncWrapper(loginController))

export default userRouter

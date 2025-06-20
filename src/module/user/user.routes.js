import { Router } from 'express'
import { createUserController, loginController } from './user.controller.js'
import { asyncWrapper } from '../../utils/asyncWrapper.js'

const userRouter = Router()

userRouter.post('/register', createUserController)

userRouter.post('/login', loginController)

export default userRouter

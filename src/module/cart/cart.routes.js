import { Router } from 'express'
import { addToCartController, getCartController } from './cart.controller.js'
import requireAuth from '../../middlewares/requireAuth.js'

const cartRouter = Router()

cartRouter.post('/', requireAuth, addToCartController)

cartRouter.get('/', requireAuth, getCartController)

export default cartRouter

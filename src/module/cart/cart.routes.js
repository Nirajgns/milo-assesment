import { Router } from 'express'
import { addToCartController, getCartController } from './cart.controller.js'

const cartRouter = Router()

cartRouter.post('/', addToCartController)

cartRouter.get('/', getCartController)

export default cartRouter

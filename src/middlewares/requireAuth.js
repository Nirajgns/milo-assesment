import jwt from 'jsonwebtoken'

import User from '../module/user/user.model.js'

import { asyncWrapper } from '../utils/asyncWrapper.js'

const requireAuth = asyncWrapper(async (req, res, next) => {
  const authToken = req.cookies.bearer

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization token required...' })
  }

  const token = authToken

  const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const user = await User.findOne({ _id }).select('_id role')

  if (!user) {
    return res.status(401).json({ error: 'User not found...' })
  }

  req.user = user

  next()
})

export default requireAuth

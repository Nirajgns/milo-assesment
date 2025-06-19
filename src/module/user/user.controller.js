import User from './user.model.js'
import { createToken } from '../../utils/jwt.js'

export const createUserController = async (req, res) => {
  const { email, password, name } = req.body

  const user = await User.register(email, password, name)

  const { password: _, ...userWithoutPassword } = user._doc

  return res.status(200).json({ data: userWithoutPassword })
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  const user = await User.login(email, password)

  // create token
  const token = createToken(user._id, user.role)

  res.cookie('bearer', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  })

  return res.status(200).json({ data: user })
}

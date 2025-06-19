import User from './user.model.js'

export const createUserController = async (req, res) => {
  const { email, password, name } = req.body

  const user = await User.register(email, password, name)

  const { password: _, ...userWithoutPassword } = user._doc

  return res.status(200).json({ data: userWithoutPassword })
}

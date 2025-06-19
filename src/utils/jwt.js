import jwt from 'jsonwebtoken'

export const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '29d',
  })
}

import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      capitalize: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // exclude from queries by default
    },
  },
  { timestamps: true }
)
userSchema.statics.register = async function (
  email,
  password,
  name,
  phone,
  role
) {
  // validation
  if (!email || !password || !name) {
    throw Error('All fields must be filled...')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid...')
  }

  if (!validator.isLength(name, { min: 3, max: 100 })) {
    throw Error('Name must be between 3 and 100 characters...')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough...')
  }

  const emailExists = await this.findOne({ email })

  if (emailExists) {
    throw Error('Email already in use...')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, name, phone, role })

  return user
}

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid...')
  }

  const user = await this.findOne({ email }).select('+password')
  if (!user) {
    throw Error('Incorrect email, please try agiain')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password please try again')
  }

  const { password: _, ...userWithoutPassword } = user._doc

  return userWithoutPassword
}

const User = mongoose.model('User', userSchema)

export default User

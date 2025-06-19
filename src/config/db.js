import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      retryWrites: true,
      writeConcern: {
        w: 'majority',
      },
    })
    .then(() => {
      console.log('MongoDB connected successfully')
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error)
    })
}

export default connectDB

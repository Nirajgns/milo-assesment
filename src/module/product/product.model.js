import mongoose from 'mongoose'

const ProductScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductScheme)

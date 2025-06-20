import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

cartItemSchema.virtual('totalItemPrice').get(function () {
  if (!this.product || !this.product.price) return 0
  return this.product.price * this.quantity
})

const CartItem = mongoose.model('CartItem', cartItemSchema)
export default CartItem

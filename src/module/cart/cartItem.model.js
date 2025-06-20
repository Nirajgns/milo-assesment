import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, default: 1, min: 1 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

cartItemSchema.virtual('amount').get(function () {
  if (!this.product || typeof this.product.price !== 'number') return 0
  return this.quantity * this.product.price
})

const CartItem = mongoose.model('CartItem', cartItemSchema)
export default CartItem

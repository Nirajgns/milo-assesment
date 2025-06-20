import CartItem from './cartItem.model.js'

export const addToCartController = async (req, res) => {
  const { productId, quantity } = req.body
  const user = req.user

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product id and quantity greater than 0  required' })
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    return res.status(400).json({ message: 'Quantity must be a whole number' })
  }

  const product = await CartItem.findOne({ user, product: productId })

  if (product) {
    const updatedProduct = await CartItem.findOneAndUpdate(
      { user, product: productId },
      { $inc: { quantity } },
      { new: true }
    )
      .populate('product')
      .populate('user')
    return res.status(200).json({
      message: 'Product added to cart successfully',
      data: updatedProduct,
    })
  } else {
    const newProduct = await CartItem.create({
      user,
      product: productId,
      quantity,
    })
    const populated = await CartItem.findById(newProduct._id)
      .populate('product')
      .populate('user')

    res.status(201).json({
      message: 'Product added to cart successfully',
      data: populated,
    })
  }
}

export const getCartController = async (req, res) => {
  const user = req.user

  const cartItems = await CartItem.find({ user })
    .populate('product')
    .populate('user')

  res
    .status(200)
    .json({ message: 'Cart retrieved successfully', data: cartItems })
}

import CartItem from './cartItem.model.js'

export const addToCartController = async (req, res) => {
  const { productId, quantity } = req.body
  const user = req.user

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product id and quantity are required' })
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    return res.status(400).json({ message: 'Quantity must be a whole number' })
  }

  const product = await CartItem.findOne({ user, product: productId })

  if (product) {
    const updatedProduct = await CartItem.findOneAndUpdate(
      { user, product: productId },
      { $inc: { quantity } }
    )
      .populate('product')
      .populate('user')
    return res.status(200).json({
      message: 'Product added to cart successfully',
      data: updatedProduct,
    })
  } else {
    const newProduct = await CartItem.save({
      user,
      product: productId,
      quantity,
    })
      .populate('product')
      .populate('user')
    res.status(201).json({
      message: 'Product added to cart successfully',
      data: newProduct,
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

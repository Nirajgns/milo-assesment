import CartItem from './cartItem.model.js'

export const addToCartController = async (req, res) => {
  const { productId, quantity } = req.body
  const user = req.user

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product id and quantity in whole number required' })
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    return res.status(400).json({ message: 'Quantity must be a whole number' })
  }

  const product = await CartItem.findOne({ user, product: productId })

  if (product) {
    const newQuantity = product.quantity + quantity

    if (newQuantity <= 0) {
      await CartItem.deleteOne({ _id: product._id })
      return res.status(200).json({
        message: 'Product removed from cart (quantity became zero)',
      })
    }

    const updatedProduct = await CartItem.findOneAndUpdate(
      { user, product: productId },
      { quantity: newQuantity },
      { new: true }
    ).populate('product')
    // .populate('user')
    return res.status(200).json({
      message: 'Product added to cart successfully',
      data: updatedProduct,
    })
  } else {
    if (quantity <= 0) {
      return res.status(400).json({
        message: 'Cannot add product with zero or negative quantity',
      })
    }

    const newProduct = await CartItem.create({
      user,
      product: productId,
      quantity,
    })
    const populated = await CartItem.findById(newProduct._id).populate(
      'product'
    )
    // .populate('user')

    res.status(201).json({
      message: 'Product added to cart successfully',
      data: populated,
    })
  }
}

export const getCartController = async (req, res) => {
  const user = req.user

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const cartItems = await CartItem.find({ user }).skip(skip).limit(limit)

  const total = await CartItem.countDocuments()

  res.status(200).json({
    message: 'Cart retrieved successfully',
    data: cartItems,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}

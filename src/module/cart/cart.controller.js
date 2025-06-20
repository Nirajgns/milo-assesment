export const addToCartController = async (req, res) => {
  res.status(200).json({ message: 'Item added to cart successfully' })
}

export const getCartController = async (req, res) => {
  res.status(200).json({ message: 'Cart retrieved successfully' })
}

import Product from './product.model.js'

export const createProductController = async (req, res) => {
  const { name, price, description } = req.body

  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: 'Name and price are required' })
  }

  const product = await Product.create({ name, price, description })
  res.status(201).json({ success: true, data: product })
}

export const getProductsController = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({ success: true, data: products })
}

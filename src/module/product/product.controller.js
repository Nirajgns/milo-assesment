import Product from './product.model.js'

export const createProductController = async (req, res) => {
  const { name, price, description } = req.body

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' })
  }

  const product = await Product.create({ name, price, description })
  res.status(201).json({ data: product })
}

export const getProductsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const products = await Product.find().skip(skip).limit(limit)
  const total = await Product.countDocuments()

  res.status(200).json({
    message: 'Products retrieved successfully',
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}

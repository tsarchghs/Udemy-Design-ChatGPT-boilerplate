import { Router } from 'express'
import { PrismaClient } from '../../generated/prisma/client'

const prisma = new PrismaClient()

export function register(app) {
  const r = Router()

  // 🔍 Searchable product list
  r.get('/products', async (req, res) => {
    try {
      const q = (req.query.q || '').toString().trim().toLowerCase()

      const products = await prisma.product.findMany({
        where: q
          ? {
              OR: [
                { name: { contains: q } },
                { description: { contains: q } },
              ],
            }
          : {},
        orderBy: { createdAt: 'desc' },
      })

      res.json(products)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  })

  // 🆔 Single product
  r.get('/products/:id', async (req, res) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.params.id },
      })
      if (!product) return res.status(404).json({ error: 'Not found' })
      res.json(product)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch product' })
    }
  })

  // mount route group
  app.use('/api/marketplace', r)
}

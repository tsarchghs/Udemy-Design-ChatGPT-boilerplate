import { Router } from 'express'
import { PrismaClient } from '../../generated/prisma/client'

const router = Router()
const prisma = new PrismaClient()

// All photos (optional ?q=search)
router.get('/', async (req, res) => {
  try {
    const q = (req.query.q as string)?.toLowerCase() || ''
    const photos = await prisma.photo.findMany({
      where: q
        ? {
            OR: [
              { title: { contains: q } },
              { location: { contains: q } },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
    })
    res.json(photos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
})

export default router

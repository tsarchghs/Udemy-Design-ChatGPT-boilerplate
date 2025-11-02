import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Router } from 'express'

const router = Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// === Resolve Prisma client paths ===
function resolveClient(relativePath: string) {
  const abs = path.resolve(__dirname, relativePath)
  return pathToFileURL(abs).href
}

const AuthClientPath = resolveClient('../../../authentication/generated/prisma/index.js')
const MarketClientPath = resolveClient('../../../marketplace/generated/prisma/index.js')

const AuthModule: any = await import(AuthClientPath)
const MarketModule: any = await import(MarketClientPath)

const AuthPrisma = AuthModule.PrismaClient
const MarketPrisma = MarketModule.PrismaClient

const authDB = new AuthPrisma()
const marketDB = new MarketPrisma()

// === Virtual ORM Layer ===
// === Virtual ORM Layer ===
const BridgeORM = {
  async getUsers(args = {}) {
    const users = await authDB.user.findMany(args)
    const photos = await marketDB.photo.findMany()
    const map = photos.reduce((acc, p) => {
      if (!p.userId) return acc
      if (!acc[p.userId]) acc[p.userId] = []
      acc[p.userId].push(p)
      return acc
    }, {} as Record<string, any[]>)
    return users.map((u) => ({ ...u, photos: map[u.id] || [] }))
  },

  async getPhotos(args = {}) {
    const photos = await marketDB.photo.findMany(args)
    const users = await authDB.user.findMany()
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]))
    return photos.map((p) => ({ ...p, user: userMap[p.userId] || null }))
  },

  async createUser(data: any) {
    const { email, name, password } = data
    return authDB.user.create({
      data: { email, name, password },
    })
  },

async createPhoto(data: any) {
  let { title, imageUrl, userId } = data

  // Handle empty userId safely
  if (userId) {
    const user = await authDB.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')
  } else {
    userId = null
  }

  // If no image URL is provided, fallback to a placeholder
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
    imageUrl = `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/600/400`
  }

  // Finally, create the photo safely
  return marketDB.photo.create({
    data: { title, imageUrl, userId },
  })
},

  async updatePhoto(id: string, data: any) {
    const { title, imageUrl, userId } = data
    return marketDB.photo.update({
      where: { id },
      data: { title, imageUrl, userId },
    })
  },

  async deleteUser(id: string) {
    await marketDB.photo.deleteMany({ where: { userId: id } })
    return authDB.user.delete({ where: { id } })
  },

  async deletePhoto(id: string) {
    return marketDB.photo.delete({ where: { id } })
  },
}

// === Routes ===

// Users CRUD
router.get('/users', async (_req, res) => {
  try {
    res.json(await BridgeORM.getUsers())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.post('/users', async (req, res) => {
  try {
    const user = await BridgeORM.createUser(req.body)
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const user = await (BridgeORM as any).updateUser(req.params.id, req.body)
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const result = await BridgeORM.deleteUser(req.params.id)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

// Photos CRUD
router.get('/photos', async (_req, res) => {
  try {
    res.json(await BridgeORM.getPhotos())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
})

router.post('/photos', async (req, res) => {
  try {
    const photo = await BridgeORM.createPhoto(req.body)
    res.json(photo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create photo' })
  }
})

router.put('/photos/:id', async (req, res) => {
  try {
    const photo = await BridgeORM.updatePhoto(req.params.id, req.body)
    res.json(photo)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update photo' })
  }
})

router.delete('/photos/:id', async (req, res) => {
  try {
    const result = await BridgeORM.deletePhoto(req.params.id)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

export default router

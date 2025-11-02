import { Router } from 'express'
import { PrismaClient } from '../../generated/prisma/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

// Environment secret for JWT (fallback for local dev)
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key'

/**
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    })

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({ user: { id: user.id, email: user.email, name: user.name }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

/**
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({ user: { id: user.id, email: user.email, name: user.name }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

/**
 * Get user profile (protected)
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing token' })

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({ id: user.id, email: user.email, name: user.name })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
})

export default router

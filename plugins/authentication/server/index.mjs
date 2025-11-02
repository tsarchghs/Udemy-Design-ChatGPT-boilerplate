// plugins/marketplace/server/index.mjs
import authRoutes from './routes/auth.ts'


export function register(app) {
  // ✅ Attach the Prisma-backed authRoutes
  app.use('/api/auth', authRoutes)

}

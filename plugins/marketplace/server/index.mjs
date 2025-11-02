// plugins/marketplace/server/index.mjs
import { register as registerMarketplaceRoutes } from './routes/products.ts'
import photos from './routes/photos'

export function register(app) {
  // ✅ Attach the Prisma-backed routes
  registerMarketplaceRoutes(app)
  app.use('/api/marketplace/photos', photos)

}

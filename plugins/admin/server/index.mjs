// plugins/marketplace/server/index.mjs
import { default as adminRoutes} from './routes/admin'


export function register(app) {
  // ✅ Attach the Prisma-backed adminRoutes
  app.use('/api/admin', adminRoutes)

}

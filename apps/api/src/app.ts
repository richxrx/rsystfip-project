import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { PORT } from './config'
import authMiddleware from './middlewares/auth.middleware'
import roleMiddleware from './middlewares/role.middleware'
import {
  accountRoutes,
  authRoutes,
  cancellationRoutes,
  categoryRoutes,
  deanRoutes,
  documentRoutes,
  facultyRoutes,
  peopleRoutes,
  reportRoutes,
  scheduleRoutes,
  sessionRoutes,
  sgRoutes,
  statisticRoutes,
  userRoutes
} from './routes'

export class App {
  private app: express.Application

  constructor(private port: number) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  settings() {
    this.app.set('port', this.port || PORT || 3000)
  }

  middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(
      express.static(path.join(__dirname, '..', '..', 'frontend', 'dist'))
    )
  }

  routes() {
    this.app.use('/api/auth', authRoutes)
    this.app.use('/api/sendgrid', sgRoutes)
    this.app.use('/api/session', sessionRoutes)
    this.app.use('/api/account', accountRoutes)
    this.app.use('/api/users', authMiddleware(), userRoutes)
    this.app.use(
      '/api/people',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      peopleRoutes
    )
    this.app.use(
      '/api/schedule',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      scheduleRoutes
    )
    this.app.use(
      '/api/cancellation',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      cancellationRoutes
    )
    this.app.use(
      '/api/categories',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      categoryRoutes
    )
    this.app.use(
      '/api/faculties',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      facultyRoutes
    )
    this.app.use(
      '/api/documents',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      documentRoutes
    )
    this.app.use(
      '/api/deans',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria', 'rector'),
      deanRoutes
    )
    this.app.use(
      '/api/reports',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria'),
      reportRoutes
    )
    this.app.use(
      '/api/statistics',
      authMiddleware(),
      roleMiddleware('admin', 'secretaria'),
      statisticRoutes
    )
  }

  listen() {
    this.app.listen(this.app.get('port'))
    console.info('Server running on port', this.app.get('port'))
  }
}

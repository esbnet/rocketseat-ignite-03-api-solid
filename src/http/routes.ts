import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { listUser } from './controllers/listUser'
import { profile } from './controllers/profile'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/users', listUser)

  // authenticate only
  app.get('/me', profile)
}

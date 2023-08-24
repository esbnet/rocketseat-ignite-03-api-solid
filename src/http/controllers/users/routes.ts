import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { list } from './list'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/users', list)

  app.patch('/token/refresh', refresh)

  // authenticate only
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

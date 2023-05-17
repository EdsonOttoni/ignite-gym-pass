import { authenticate } from '@/http/controllers/users/authenticate'
import { profile } from '@/http/controllers/users/profile'
import { register } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticate */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

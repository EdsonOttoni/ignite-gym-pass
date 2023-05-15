import { authenticate } from '@/http/controllers/authenticate'
import { profile } from '@/http/controllers/profile'
import { register } from '@/http/controllers/register'
import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticate */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

import { FastifyInstance } from 'fastify'

import { create } from '../controllers/gyms/create'
import { nearby } from '../controllers/gyms/nearby'
import { search } from '../controllers/gyms/search'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}

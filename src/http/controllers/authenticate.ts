import { InvalidCredentialError } from '@/shared/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const getAuthenticate = makeAuthenticateUseCase()

    const { user } = await getAuthenticate.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    )
    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError)
      return reply.status(400).send({ error: err.message })
    throw err
  }
}

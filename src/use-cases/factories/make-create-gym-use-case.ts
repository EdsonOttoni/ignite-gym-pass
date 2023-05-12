import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymsUseCase = new CreateGymUseCase(prismaGymsRepository)

  return createGymsUseCase
}

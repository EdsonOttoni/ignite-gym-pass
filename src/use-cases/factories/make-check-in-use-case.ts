import { PrimasCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const prismaUsersRepository = new PrimasCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaUsersRepository,
    prismaGymsRepository
  )

  return checkInUseCase
}

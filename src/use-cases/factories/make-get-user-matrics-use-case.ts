import { PrimasCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { GetUserMetricsUseCase } from '../get-user-matrics'

export function makeGetUserMetricsUseCase() {
  const prismaUsersRepository = new PrimasCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaUsersRepository)

  return getUserMetricsUseCase
}

import { PrimasCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const prismaUsersRepository = new PrimasCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    prismaUsersRepository
  )

  return validateCheckInUseCase
}

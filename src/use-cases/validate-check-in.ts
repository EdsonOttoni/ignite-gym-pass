import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFound } from '@/shared/errors'
import { LateCheckInValidationError } from '@/shared/errors/late-check-in-validation-error'
import { TIME_VALIDATION_OF_CREATION_CHECKIN } from '@/shared/utils'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute'
    )

    if (
      distanceInMinutesFromCheckInCreation > TIME_VALIDATION_OF_CREATION_CHECKIN
    ) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}

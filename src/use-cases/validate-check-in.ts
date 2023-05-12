import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFound } from '@/shared/errors'
import { CheckIn } from '@prisma/client'

interface ValidateCheckInCaseRequest {
  checkInId: string
}
interface ValidateCheckInCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInCaseRequest): Promise<ValidateCheckInCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    checkIn.validated_at = new Date()

    this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}

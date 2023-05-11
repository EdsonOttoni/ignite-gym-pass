import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMeticsUseCaseRequest {
  userId: string
}
interface GetUserMeticsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMeticsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMeticsUseCaseRequest): Promise<GetUserMeticsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

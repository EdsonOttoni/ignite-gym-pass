import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyCaseRequest): Promise<FetchNearbyCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}

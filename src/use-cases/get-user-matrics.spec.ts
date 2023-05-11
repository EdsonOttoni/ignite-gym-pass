import { InMemoryCheckInsRepositoryRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi } from 'vitest'

import { GetUserMeticsUseCase } from './get-user-matrics'

let checkInsRepository: InMemoryCheckInsRepositoryRepository
let sut: GetUserMeticsUseCase

describe('Get USer Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositoryRepository()
    sut = new GetUserMeticsUseCase(checkInsRepository)

    vi.useRealTimers()
  })

  it('should be able to get user check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})

import { InMemoryCheckInsRepositoryRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'

import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepositoryRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepositoryRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'sdad',
      userId: 'sad',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

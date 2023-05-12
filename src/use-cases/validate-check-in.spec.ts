import { InMemoryCheckInsRepositoryRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFound } from '@/shared/errors'
import { expect, describe, it, beforeEach } from 'vitest'

import { ValidateCheckInCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepositoryRepository
let sut: ValidateCheckInCase

describe('Validate check in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositoryRepository()
    sut = new ValidateCheckInCase(checkInsRepository)

    // vi.useRealTimers()
  })

  // afterEach(() => {
  //   vi.useRealTimers()
  // })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user_01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate the check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

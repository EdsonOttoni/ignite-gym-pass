import { InMemoryCheckInsRepositoryRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepositoryRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError, MaxNumberOfCheckInsError } from '@/shared/errors'
import { Decimal } from '@prisma/client/runtime'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepositoryRepository
let gymsRepository: InMemoryGymsRepositoryRepository
let sut: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepositoryRepository()
    gymsRepository = new InMemoryGymsRepositoryRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia',
      description: 'descrição',
      phone: '38999401128',
      latitude: -27.2092052,
      longitude: -47.6401091,
    })

    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -47.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -47.6401091,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -47.6401091,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -47.6401091,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -47.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'Academia',
      description: 'descrição',
      phone: '38999401128',
      latitude: -17.2277051,
      longitude: -46.8509959,
    })

    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -17.2180766,
        userLongitude: -46.8661927,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

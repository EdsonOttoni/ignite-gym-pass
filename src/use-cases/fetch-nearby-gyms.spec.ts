import { InMemoryGymsRepositoryRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, vi } from 'vitest'

import { FetchNearbyCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepositoryRepository
let sut: FetchNearbyCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositoryRepository()
    sut = new FetchNearbyCase(gymsRepository)

    vi.useRealTimers()
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -47.6401091,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -48.6401091,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -47.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })
})

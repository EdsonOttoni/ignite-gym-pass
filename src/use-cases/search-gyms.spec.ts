import { InMemoryGymsRepositoryRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, vi } from 'vitest'

import { SearchGymsCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepositoryRepository
let sut: SearchGymsCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositoryRepository()
    sut = new SearchGymsCase(gymsRepository)

    vi.useRealTimers()
  })

  it('should be able to search for gyms', async () => {
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
      longitude: -47.6401091,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to( fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: 'gym-01',
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -47.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: `JavaScript Gym 21` }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})

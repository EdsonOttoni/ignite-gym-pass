import { InMemoryGymsRepositoryRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepositoryRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepositoryRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -47.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

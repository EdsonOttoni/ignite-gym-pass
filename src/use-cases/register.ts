import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) throw new Error('E-mail already being used')

    const password_hash = await hash(password, 6)

    await this.userRepository.create({ email, name, password_hash })
  }
}

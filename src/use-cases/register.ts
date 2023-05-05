import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'
import { HASH_SALT } from '@/shared/utils'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, HASH_SALT)

    const user = await this.userRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}

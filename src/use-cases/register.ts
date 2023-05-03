import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: any) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) throw new Error('E-mail already being used')

    const password_hash = await hash(password, 6)

    await this.userRepository.create({ email, name, password_hash })
  }
}

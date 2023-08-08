import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

interface RegisterProps {
  name: string
  email: string
  password: string
}

interface RegisterUserResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usesRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterProps): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usesRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usesRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}

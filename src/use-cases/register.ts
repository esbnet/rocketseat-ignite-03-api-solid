import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterProps {
  name: string
  email: string
  password: string
}

interface RegisterUserResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterProps): Promise<RegisterUserResponse> {
    const password_hash = await bcryptjs.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}

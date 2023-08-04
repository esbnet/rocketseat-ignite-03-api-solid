import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

interface RegisterProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private useRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterProps) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.useRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.useRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

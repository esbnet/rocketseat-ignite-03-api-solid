import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const UsersRepository = new RegisterUseCase(new InMemoryUsersRepository())

    const { user } = await UsersRepository.execute({
      name: 'any_name',
      email: 'any_emaildasd3@gmail.com',
      password: 'any_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const UsersRepository = new RegisterUseCase(new InMemoryUsersRepository())

    const { user } = await UsersRepository.execute({
      name: 'any_name',
      email: 'any_email13@gmail.com',
      password: 'any_password',
    })

    const isPasswordHashed = await compare('any_password', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register user with same email twice', async () => {
    const registerCase = new RegisterUseCase(new InMemoryUsersRepository())

    const email = 'any_email@gmail.com'

    await registerCase.execute({
      name: 'any_name',
      email,
      password: 'any_password',
    })

    await expect(() =>
      registerCase.execute({
        name: 'any_name',
        email,
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

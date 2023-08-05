import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'any_name',
      email: 'any_emaildasd3@gmail.com',
      password_hash: await hash('any_password', 6),
    })

    const { user } = await sut.execute({
      email: 'any_emaildasd3@gmail.com',
      password: 'any_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'any_emaildasd3@gmail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'any_name',
      email: 'any_emaildasd3@gmail.com',
      password_hash: await hash('any_password', 6),
    })

    expect(() =>
      sut.execute({
        email: 'any_emaildasd3@gmail.com',
        password: 'any_password_wrong',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

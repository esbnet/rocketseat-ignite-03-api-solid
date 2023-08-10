import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface searchGymsUseCaseRequest {
  query: string
  page: number
}

interface searchGymsUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymsUseCase {
  constructor(private usersRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: searchGymsUseCaseRequest): Promise<searchGymsUseCaseResponse> {
    const gyms = await this.usersRepository.searchMany(query, page)

    if (!gyms) {
      throw new ResourceNotFoundError()
    }

    return { gyms }
  }
}

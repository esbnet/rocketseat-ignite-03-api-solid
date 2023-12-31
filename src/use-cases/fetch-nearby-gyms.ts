import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (!gyms) {
      throw new ResourceNotFoundError()
    }

    return { gyms }
  }
}

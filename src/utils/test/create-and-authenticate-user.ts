import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'any_name',
    email: 'esbnet@hotmail.com',
    password: '123123',
  })

  const authResonse = await request(app.server).post('/sessions').send({
    email: 'esbnet@hotmail.com',
    password: '123123',
  })

  const { token } = authResonse.body

  return { token }
}

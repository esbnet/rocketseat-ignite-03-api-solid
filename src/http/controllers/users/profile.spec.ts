import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profiel (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'esbnet@hotmail.com',
      }),
    )
  })
})

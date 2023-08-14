import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const userId = request.user.sub

  console.log(userId)

  return reply.status(200).send()
}

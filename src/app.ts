import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.: ', issue: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: log error on external tools (datadog, sentry, etc)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

// app.get('/users/:id', async (request, reply) => {
//   const id = request.params.id

//   const users = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   return reply.send(users);
// })

// app.put('/users/:id', async (request, reply) => {
//   const id = request.params.id

//   const updateBodySchema = z.object({
//     name: z.string(),
//     email: z.string().email(),
//     password: z.string().min(6),
//   })

//   const { name, email, password } = updateBodySchema.parse(request.body);

//   await prisma.user.update({
//     where: {
//       id: id,
//     },
//     data: {
//       name,
//       email,
//       password_hash: password,
//     }
//   })

//   return reply.send();
// })

// app.delete('/users/:id', async (request, reply) => {
//   const id = request.params.id

//   await prisma.user.delete({
//     where: {
//       id: id,
//     },
//   })

//   return reply.send();
// })

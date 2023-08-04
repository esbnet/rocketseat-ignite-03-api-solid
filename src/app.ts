import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

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
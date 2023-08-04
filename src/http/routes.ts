import { FastifyInstance } from "fastify";
import { listUser } from "./controllers/listUser";
import { register } from "./controllers/register";

export async function appRoutes(app:FastifyInstance) {
  app.post('/users', register)
  app.get('/users', listUser)
}

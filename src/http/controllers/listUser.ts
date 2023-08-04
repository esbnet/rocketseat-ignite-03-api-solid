import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function  listUser(request: FastifyRequest, reply: FastifyReply) { 
  const users = await prisma.user.findMany();

  return reply.send(users);
}

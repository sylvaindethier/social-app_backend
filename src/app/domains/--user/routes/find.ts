import type { FastifyInstance } from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import User from "../model.ts";

// ***************** //
// ***** FIND  ***** //
// ***************** //
export async function find(
  // @ts-expect-error: `request` never read
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const filter = {};
    // console.log(FUNCTION_PATH, filter);
    const docs = await User.find(filter);

    // Send reply
    reply.status(200).send(docs);

    // Error
  } catch (error) {
    reply.status(500).send(error);
  }
}

export default function routes(
  fastify: FastifyInstance
  // // @ts-expect-error : `options` 'any' type
  // options
) {
  fastify.get("/find", find);

  // // RESTful
  // fastify.get("/", find);
}

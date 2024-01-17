import type { FastifyInstance } from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import User from "../model.ts";

// ****************** //
// ***** CREATE ***** //
// ****************** //
type Request__create = {
  email: string;
  password: string;
  password_confirm: string;
};
async function create(
  request: FastifyRequest<{ Body: Request__create }>,
  reply: FastifyReply
) {
  try {
    const { email, password, password_confirm } = request.body;

    // validate email
    if (!User.email__validate(email)) {
      throw new Error("Invalid email", { cause: email });
    }

    // validate password & password_confirm MUST be equals
    if (!password || password !== password_confirm) {
      throw new Error("Invalid password confirm");
    }

    // User props from password (hash the password)
    const props = await User.from_password({ password, email });

    // User create
    const doc = await User.create(props);

    // Send response
    reply.status(201).send(doc);

    // Error
  } catch (error) {
    reply.status(400).send(error);
  }
}

export default function routes(
  fastify: FastifyInstance
  // // @ts-expect-error : `options` 'any' type
  // options
) {
  fastify.post("/create", create);

  // // RESTful
  // fastify.post("/", create);
}

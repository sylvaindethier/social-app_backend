import type { FastifyRequest, FastifyReply } from "fastify";
import User from "./model.ts";
import type { Request_id } from "./request.ts";

// ****************** //
// ***** UPDATE ***** //
// ****************** //
type Request__update = {
  email: string;
  password: string;
  password_confirm: string;
  username: string;
};

export async function updateBy_id(
  request: FastifyRequest<{ Params: Request_id, Body: Request__update }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const doc = await User.findById(id);

    // User not found by `id`
    if (null === doc) {
      const message = "User not found";
      const cause = `id: ${id}`;
      console.error(message, cause);
      throw new Error(message, { cause });
    }

    const { email, username, password, password_confirm } = request.body;

    // email is provided (validated by model)
    if (email) {
      doc.email = email;
    }

    // username is provided (validated by model)
    if (username) {
      doc.username = username;
    }

    // password is provided
    if (password && password_confirm) {
      // password & password_confirm MUST be equals
      if (password !== password_confirm) {
        // status: 400
        throw new Error("Invalid password confirm");
      }

      const passwordHash = await User.password__hash(password);
      doc.passwordHash = passwordHash;
    }

    // User save
    await doc.save();

    // Send response
    reply.status(201).send(doc);

    // Error
  } catch (error) {
    reply.status(400).send(error);
  }
}

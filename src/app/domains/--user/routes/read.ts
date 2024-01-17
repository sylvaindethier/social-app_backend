import type { FastifyInstance } from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import User from "../model.ts";

// // ********************** //
// // ***** READ By id ***** //
// // ********************** //
// import type { Request_id } from "../request.ts";
// async function readBy_id(
//   request: FastifyRequest<{ Params: Request_id }>,
//   reply: FastifyReply
// ) {
//   try {
//     const { id } = request.params;
//     const doc = await User.findById(id);

//     // User not found by `id`
//     if (null === doc) {
//       const message = "User not found";
//       const cause = `id: ${id}`;
//       console.error(message, cause);
//       throw new Error(message, { cause });
//     }

//     // Send reply
//     reply.status(200).send(doc);

//     // Error
//   } catch (error) {
//     reply.status(404).send(error);
//   }
// }

// **************************** //
// ***** READ By username ***** //
// **************************** //
import type { Request_username } from "../request.ts";
async function readBy_username(
  request: FastifyRequest<{ Params: Request_username }>,
  reply: FastifyReply
) {
  try {
    // filter by `username` from request OR `id` from authUser
    const { username } = request.params;
    // const id = authUser_id({ res });
    // const filter = username ? { username } : { id };
    // console.log(FUNCTION_PATH, "User.findOne", filter);
    const doc = await User.findOne({ username });

    // User not found by `username`
    if (null === doc) {
      const message = "User not found";
      const cause = `username: ${username}`;
      console.error(message, cause);
      throw new Error(message, { cause });
    }

    // Send reply
    reply.status(200).send(doc);

    // Error
  } catch (error) {
    reply.status(404).send(error);
  }
}

export default function routes(
  fastify: FastifyInstance
  // // @ts-expect-error : `options` 'any' type
  // options
) {
  fastify.get("/read/:username", readBy_username);

  // // RESTful
  // fastify.get("/:id", readBy_id);
}

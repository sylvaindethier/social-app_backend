import type { FastifyRequest, FastifyReply } from "fastify";
import User from "./model.ts";
import { user_notFound } from "./errors.ts";
import type { Request_id } from "./request.ts";

// ****************** //
// ***** DELETE ***** //
// ****************** //
export async function deleteBy_id(
  request: FastifyRequest<{ Params: Request_id }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const doc = await User.findByIdAndDelete(id);

    // User not found by id
    user_notFound(doc, `id: ${id}`);

    // // Remove picture file
    // filePath__remove(doc.picture_path);
    // // Remove banner file
    // filePath__remove(doc.banner_path);

    // Send reply
    reply.status(204).send(doc);

    // // next middleware when auth user is document id
    // if (!authUser_id__is({ req, res }, doc.id)) {
    //   return res.status(200).json(doc);
    // }
    // next();

    // Error
  } catch (error) {
    reply.status(404).send(error);
  }
}

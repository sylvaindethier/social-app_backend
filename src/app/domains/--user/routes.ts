import type { FastifyInstance } from "fastify";

import routes_create from "./routes/create.ts";
import routes_read from "./routes/read.ts";
// import { read, readBy_id } from "./controller.read.ts";
// import { update, updateBy_id } from "./controller.update.ts";
// import { delete_, deleteBy_id } from "./controller.delete.ts";
import routes_find from "./routes/find.ts";

export default async function routes(
  fastify: FastifyInstance,
  // // @ts-expect-error : `options` 'any' type
  // options
)
 {
  // ***** create ***** //
  routes_create(fastify);

  // ***** read ***** //
  routes_read(fastify);

  // // ****************** //
  // // ***** update ***** //
  // // ****************** //
  // fastify.post("/update", update);
  // // // RESTful
  // // fastify.put("/:id", updateBy_id);

  // // ****************** //
  // // ***** delete ***** //
  // // ****************** //
  // fastify.post("/delete/:username", delete_);
  // // // RESTful
  // // fastify.delete("/:id", deleteBy_id);

  // ***** find ***** //
  routes_find(fastify);
}

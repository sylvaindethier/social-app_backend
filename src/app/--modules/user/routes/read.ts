const FILE_PATH = "./app/modules/user/routes/read";

import { requestInfo } from "#app/lib/info.ts";
import { authRequest } from "#app/middlewares/auth.ts";
import { request_username } from "../request.ts";
import { authUser_id } from "../authUser.ts";
import { User } from "../model.ts";

import type { RequestHandler } from "express";
const handlers: RequestHandler[] = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // auth Request can read
  authRequest,
  // @ts-expect-error: `req` never read
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;

    try {
      const can__ = true;
      if (!can__) {
        throw new Error("Can NOT read");
      }

      console.log(FUNCTION_PATH, "return next()");
      return next();
    } catch (error) {
      const { message: errorMessage } = error as Error;
      const message = `Forbidden. ${errorMessage}`;
      console.error(FUNCTION_PATH, message, error);
      return res.status(403).json({ message });
    }
  },

  // ********************** //
  // ***** Controller ***** //
  // ********************** //
  // @ts-expect-error: `next` never read
  async function controller(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::controller`;
    // @ts-expect-error: arguments number expected
    requestInfo(FUNCTION_PATH)(req);

    try {
      // filter by `username` from request OR `id` from authUser
      const username = request_username(req);
      const id = authUser_id({ res });
      const filter = username ? { username } : { id };
      console.log(FUNCTION_PATH, "User.findOne", filter);
      const doc = await User.findOne(filter);

      // User not found
      if (null === doc) {
        const message = "User not found";
        console.error(message, filter);
        throw new Error("User not found", { cause: filter });
      }

      // Send response
      console.info(FUNCTION_PATH, doc);
      return res.status(200).json(doc);

      // Error
    } catch (error) {
      const { message: errorMessage} = error as Error;
      const message = `User not found. ${errorMessage}`;
      console.error(FUNCTION_PATH, message, error);
      return res.status(404).json({ message });
    }
  },
];
export default handlers;

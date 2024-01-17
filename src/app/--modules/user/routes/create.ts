const FILE_PATH = "./app/modules/user/routes/create";

// import { requestInfo } from "#app/lib/info.ts";
import { User } from "../model.ts";

import type { RequestHandler } from "express";
const handlers: RequestHandler[] = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // All Request can create
  // @ts-expect-error: `req` never read
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;
    // // @ts-expect-error: expected number of arguments
    // requestInfo(FUNCTION_PATH)(req);

    try {
      const can__ = true;
      if (!can__) {
        throw new Error("Can NOT create");
      }

      console.log(FUNCTION_PATH, "return next()");
      return next();
    } catch (error) {
      const {message: errorMessage} = error as Error;
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
    // // @ts-expect-error: expected number of arguments
    // requestInfo(FUNCTION_PATH)(req);

    try {
      const { email, password, password_confirm } = req.body;

      // validate email
      if (!User.email__validate(email)) {
        throw new Error("Invalid email", { cause: email });
      }

      // validate password & password_confirm MUST be equals
      if (!password || password !== password_confirm) {
        throw new Error("Invalid password confirm");
      }

      // User props from password
      const props = await User.from_password({ password, email });

      // User create
      // console.debug(FUNCTION_PATH, props);
      const doc = await User.create(props);

      // Send response
      console.info(FUNCTION_PATH, doc);
      return res.status(201).json(doc);

      // Error
    } catch (error) {
      const { message }  = error as Error;
      console.error(FUNCTION_PATH, message, error);
      return res.status(400).json({ message });
    }
  },
];
export default handlers;

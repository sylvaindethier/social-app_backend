const FILE_PATH = "./app/modules/user/routes/login";

import { requestInfo } from "#app/lib/info.ts";
import { authResponse } from "#app/middlewares/auth.ts";
import { authUserSet } from "../authUser.ts";
import User from "../model.ts";
import type { RoleName } from "#app/modules/role/model.ts";

import type { RequestHandler } from "express";
const handlers: RequestHandler[] = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // all Request can login
  // @ts-expect-error: `req` never read
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;

    try {
      const can__ = true;
      if (!can__) {
        throw new Error("Can NOT login");
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
  async function controller(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::controller`;
    // @ts-expect-error: arguments number expected
    requestInfo(FUNCTION_PATH)(req);

    try {
      const { identifier, password } = req.body;
      let filter = {};

      // identifier is email
      if (User.email__validate(identifier)) {
        filter = { email: identifier };
      }

      // identifier is username
      else if (User.username__validate(identifier)) {
        filter = { username: identifier };
      }

      console.log(FUNCTION_PATH, "User.findOne", filter);
      const doc = await User.findOne(filter);

      // User validate password
      if (null === doc || !User.password__compare(password, doc.passwordHash)) {
        throw new Error("Invalid user credentials");
      }

      // set Auth user
      const authUser = { id: doc.id, role: doc.role?.name as RoleName };
      authUserSet({ res }, authUser);

      console.log(FUNCTION_PATH, "return next()");
      return next();

      // Error
    } catch (error) {
      const { message: errorMessage } = error as Error;
      const message = `Unauthorized. ${errorMessage}`;
      console.error(FUNCTION_PATH, message, error);
      return res.status(401).json({ message });
    }
  },
  authResponse,
];
export default handlers;

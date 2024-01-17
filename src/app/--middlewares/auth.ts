const FILE_PATH = "./app/middlewares/auth";
import {
  auth_fromRequest,
  auth_setResponse,
  auth_add,
  auth_get,
  auth_resetResponse,
  auth_delete,
} from "#app/auth/auth.ts";
export { authHandler as default } from "#app/auth/auth.ts";
import type { RequestHandler } from "express";

// *********************** //
// ***** authRequest ***** //
// * Get auth payload from Request
// * Add auth payload
// * Set auth Response
// *********************** //
export const authRequest: RequestHandler = (req, res, next) => {
  const FUNCTION_PATH = `${FILE_PATH}::authRequest`;

  try {
    const payload = auth_fromRequest(req);
    const value = auth_add({ res }, payload);
    auth_setResponse(res, value);
    console.log(FUNCTION_PATH, value);

    console.log(FUNCTION_PATH, "return next()");
    return next();
  } catch (error) {
    const message = `Unauthorized ${(error as Error).message}`;
    console.error(FUNCTION_PATH, message);
    return res.status(401).json({ message });
  }
};

// ************************ //
// ***** authResponse ***** //
// * Get auth payload
// * Set auth Response
// ************************ //
// @ts-expect-error: `req` never read
export const authResponse: RequestHandler = (req, res, next) => {
  const FUNCTION_PATH = `${FILE_PATH}::authResponse`;

  try {
    const payload = auth_get({ res });
    if (undefined === payload) {
      throw Error("no payload");
    }

    auth_setResponse(res, payload);
    res.status(200).json(payload);

    console.log(FUNCTION_PATH, "return next()");
    return next();
  } catch (error) {
    const message = `Unauthorized ${(error as Error).message}`;
    console.error(FUNCTION_PATH, message);
    return res.status(401).json({ message });
  }
}

// ********************* //
// ***** authReset ***** //
// * Delete auth payload
// * Reset auth Response
// ********************* //
// @ts-expect-error: `req` never read
export const authReset: RequestHandler = (req, res, next) => {
  const FUNCTION_PATH = `${FILE_PATH}::authReset`;

  auth_delete({ res });
  auth_resetResponse(res);
  res.status(200).json({ message: "Auth reset" });

  console.log(FUNCTION_PATH, "return next()");
  return next();
}

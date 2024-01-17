const FILE_PATH = "./app/auth/auth";
const KEY = "Authorization";

// *********************** //
// ***** authHandler ***** //
// *********************** //
import cookieParser from "cookie-parser";
export const authHandler = cookieParser();

/** AuthPayload */
import type { AuthPayload } from "./payload.ts";

import { auth_fromString, auth_toString } from "./string.ts";
export { auth_delete, auth_get, auth_add } from "./store.ts";
export type { AuthStore } from "./store.ts";

import type { Request, Response } from "express";

/**
 * Extract the auth payload from the Request
 * @param {Request} req
 * @returns {AuthPayload} The auth payload from the Request
 * @throws {Error} When no KEY Request
 */
export function auth_fromRequest(req: Request): AuthPayload {
  const FUNCTION_PATH = `${FILE_PATH}::auth_fromRequest`;

  // auth string is in request headers or cookie
  const string = req.headers[KEY] || req.cookies[KEY];
  if (!string) {
    const message = `no "${KEY}" request`;
    console.error(FUNCTION_PATH, message);
    throw Error(message);
  }

  const payload = auth_fromString(string);
  // console.log(FUNCTION_PATH, payload);
  return payload;
}

/**
 * Set the auth payload to the Response
 * @param {Response} res
 * @param {AuthPayload} payload The auth payload to set to the Response
 */
export function auth_setResponse(res: Response, payload: AuthPayload) {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_setResponse`;

  // set auth string in request header & cookie
  const string = auth_toString(payload);
  res.append(KEY, string);
  res.cookie(KEY, string);
  // console.log(FUNCTION_PATH, "header & cookie", KEY, string);
}

/**
 * Reset the auth payload to the Response
 * @param {Response} res
 */
export function auth_resetResponse(res: Response) {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_resetResponse`;

  // reset auth string in request header & cookie
  res.append(KEY, undefined);
  res.clearCookie(KEY);
  // console.log(FUNCTION_PATH, "header & cookie", KEY);
}

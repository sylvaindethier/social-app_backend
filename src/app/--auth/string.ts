// const FILE_PATH = "./app/auth/string";

import { auth_toToken, auth_fromToken } from "./token.ts";
import type { AuthToken } from "./token.ts";
export type AuthString = `Bearer ${AuthToken}`;
import type { AuthPayload } from "./payload.ts";

/**
 * Build auth string form auth payload
 * auth payload to auth string
 * @param {AuthPayload} payload The auth payload
 * @returns {AuthString} The auth string
 */
export function auth_toString(payload: AuthPayload): AuthString {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_toString`;

  // get token from payload
  const token = auth_toToken(payload);

  // console.log(FUNCTION_PATH, { token });
  return `Bearer ${token}` as AuthString;
}

/**
 * Extract auth payload from auth string
 * auth payload from auth string
 * @param {AuthString} string The auth string
 * @returns {AuthPayload} The auth payload
 */
export function auth_fromString(string: AuthString): AuthPayload {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_fromString`;

  // extract token: should be `Bearer ${token}`
  const token = string.split(" ")[1] as AuthToken;
  // verify token to get payload
  return auth_fromToken(token);
}

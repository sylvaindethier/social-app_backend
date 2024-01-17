// const FILE_PATH = "./app/auth/token";

import { env } from "#src/env.ts";
const JWT_SECRET = env(process.env, "APP_AUTH__JWT_SECRET")
const JWT_EXPIRES = env(process.env, "APP_AUTH__JWT_EXPIRES");

import jwt from "jsonwebtoken";
import type { AuthPayload } from "./payload.ts";
export type AuthToken = string;

/**
 * Sign a payload to token
 * auth payload to auth token
 * @param {AuthPayload} payload The auth payload
 * @returns {AuthToken} The auth token
 */
export function auth_toToken(payload: AuthPayload): AuthToken {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_toToken`;

  // remove JWT props if any
  const { iat, exp, ...json } = payload;

  return jwt.sign(json, JWT_SECRET, { expiresIn: JWT_EXPIRES }) as AuthToken;
}

/**
 * Verify a token to payload
 * auth payload from auth token
 * @param {AuthToken} token The auth token
 * @returns {AuthPayload} The auth payload
 */
export function auth_fromToken(token: AuthToken): AuthPayload {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_fromToken`;

  // verify token to get payload
  const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;

  // remove JWT props if any
  const { iat, exp, ...json } = payload;
  return json;
}

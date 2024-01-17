const FILE_PATH = "./app/auth/store";
const KEY = "auth";

import type { AuthPayload } from "./payload.ts";
import type { Response } from "express";

export type AuthStore = {
  res: Response;
};

/**
 * Invalid payload
 * @param {AuthPayload} payload
 * @returns {boolean} Whether or not the payload is invalid
 */
function invalid(payload: AuthPayload): boolean {
  return undefined === payload || null === payload || !payload;
}

/**
 * Delete the auth payload from the store
 * @param {AuthStore} store
 * @returns {boolean} Whether or not delete success
 */
export function auth_delete({ res }: AuthStore): boolean {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_delete`;
  return delete res.locals[KEY];
}

/**
 * Set the auth payload to the store
 * @param {AuthStore} store
 * @param {AuthPayload} payload The auth payload to set
 * @throws {Error} When invalid payload
 */
function auth_set({ res }: AuthStore, payload: AuthPayload) {
  const FUNCTION_PATH = `${FILE_PATH}::auth_set`;

  if (invalid(payload)) {
    const message = "invalid payload";
    console.error(FUNCTION_PATH, message, payload);
    throw Error(message);
  }

  auth_delete({ res });
  res.locals[KEY] = payload;
  // console.log(FUNCTION_PATH, payload);
}

/**
 * Get the auth payload from the store
 * @param {AuthStore} store
 * @returns {AuthPayload | undefined} The auth payload
 */
export function auth_get({ res }: AuthStore): AuthPayload | undefined {
  // const FUNCTION_PATH = `${FILE_PATH}::auth_get`;
  return res.locals[KEY];
}

/**
 * Add the auth payload to the store
 * @param {AuthStore} store
 * @param {AuthPayload} payload Tha auth payload to add
 * @returns {AuthPayload} The resulting auth payload
 * @throws {Error} When invalid payload
 */
export function auth_add(
  { res }: AuthStore,
  payload: AuthPayload
): AuthPayload {
  const FUNCTION_PATH = `${FILE_PATH}::auth_add`;

  // add payload to current auth payload if any
  if (invalid(payload)) {
    const message = "invalid payload";
    console.error(FUNCTION_PATH, "invalid payload", payload);
    throw Error(message);
  }

  // merge current and payload
  const current = auth_get({ res }) ?? ({} as AuthPayload);
  const value = { ...current, ...payload } as AuthPayload;
  auth_set({ res }, value);

  // console.log(FUNCTION_PATH, value);
  return value;
}

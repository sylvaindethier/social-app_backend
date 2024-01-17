// const FILE_PATH = "./app/modules/user/request";

import type { Request } from "express";

function request_KEY(req: Request, key: string): string | undefined {
  return req.params?.[key] || req.query?.[key] || req.body?.[key] || undefined;
}

// function request_KEY__delete(req: Request, key: string): void {
//   delete req.params?.[key];
//   delete req.query?.[key];
//   delete req.body?.[key];
// }

/**
 * Get `id` from the Request in order: params, query, body
 * @param {Request} req The Request to get the `id` from
 * @returns {string | undefined} The Request `id`
 */
export const request_id = (req: Request): ReturnType<typeof request_KEY> =>
  request_KEY(req, "id");

// /**
//  * Delete the Request `id`
//  * @param {Request} req The Request
//  */
// export const request_id__delete = (
//   req: Request
// ): ReturnType<typeof request_KEY__delete> => request_KEY__delete(req, "id");

/**
 * Get `username` from the Request in order: params, query, body
 * @param {Request} req The Request to get the `username` from
 * @returns {string | undefined} The Request `username`
 */
export const request_username = (
  req: Request
): ReturnType<typeof request_KEY> => request_KEY(req, "username");

// /**
//  * Delete the Request `username`
//  * @param {Request} req The Request
//  */
// export const request_username__delete = (
//   req: Request
// ): ReturnType<typeof request_KEY__delete> =>
//   request_KEY__delete(req, "username");

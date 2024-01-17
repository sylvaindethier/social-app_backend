const FILE_PATH = "/app/modules/user/routes/handlers";

// auth
import {
  authRequest,
  authResponse,
  authReset,
} from "#app/middlewares/auth.mjs";

// auth
import * as auth from "./auth.mjs";
// routes controller
import * as controller from "./controller.mjs";



// ******************* //
// ***** delete_ ***** //
// ******************* //
export const delete_ = [
  // auth Request can delete
  authRequest,
  auth.can_delete,
  controller.delete_,
  authReset,
];

// **************** //
// ***** find ***** //
// **************** //
export const find = [
  // auth Request can find
  authRequest,
  auth.can_find,
  controller.find,
];


// ****************** //
// ***** logout ***** //
// ****************** //
export const logout = [
  // All Request can logout
  auth.can_logout,
  authReset,
];

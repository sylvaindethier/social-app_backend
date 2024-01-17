const FILE_PATH = "/app/modules/upload/routes/handlers";

// auth
import {
  authRequest,
} from "../../../middlewares/auth.mjs";

// uploads
import uploads from "../middlewares/uploads.mjs";

// routes auth User
import * as authUser from "./authUser.mjs";
// routes controller
import * as controller from "./controller.mjs";

// ****************** //
// ***** create ***** //
// ****************** //
export const create = [
  authRequest,
  // auth Request can create
  authUser.create,

  // controller
  controller.create,
];

// **************** //
// ***** read ***** //
// **************** //
export const read = [
  // auth Request can read
  authRequest,
  authUser.read,

  // controller
  controller.findById,
];


// ****************** //
// ***** update ***** //
// ****************** //
export const update = [
  // auth Request can update
  authRequest,
  // Use uploads
  uploads,
  authUser.update,

  // controller
  controller.updateById,
];

// ******************** //
// ***** delete__ ***** //
// ******************** //
export const delete__ = [
  // Auth request can delete
  authRequest,
  authUser.delete__,

  // controller
  controller.deleteById,

  // auth Reset
  authReset,
];

// *************************** //
// ***** delete__uploads ***** //
// *************************** //
export const delete__uploads = [
  // Auth request can delete
  authRequest,
  authUser.delete__uploads,

  // controller
  controller.deleteUploadsById,
];

// **************** //
// ***** find ***** //
// **************** //
export const find = [
  // Auth request can find
  authRequest,
  authUser.find,

  // controller
  controller.find,
];

// ***************** //
// ***** login ***** //
// ***************** //
export const login = [
  // Every request can login
  authUser.login,

  // controller
  controller.login,

  // auth Response
  authResponse,
];

// ****************** //
// ***** logout ***** //
// ****************** //
export const logout = [
  // Every request can logout
  authUser.logout,

  // auth Reset
  authReset,
];

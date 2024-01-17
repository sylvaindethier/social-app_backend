// Authorization
import { authRequest } from "../middlewares/auth.mjs";

// Auth User
import {
  authUser_create,
  authUser_read,
  authUser_update,
  authUser_delete,
  authUser_deleteImage,
  authUser_find,
  authUser_react,
} from "./middlewares/auth.mjs";

// Pub image middleware
import image from "./middlewares/image.mjs";

// Controller
import {
  create,
  readById,
  updateById,
  deleteById,
  deleteImageById,
  find,
  react,
} from "./controller.mjs";

// ****************** //
// ***** Create ***** //
// ****************** //
export const createHandlers = [
  // Auth request can create
  authRequest,
  // Use image storage
  image,
  authUser_create,

  // Pub create
  create,
];

// **************** //
// ***** Read ***** //
// **************** //
export const readHandlers = [
  // Auth request can read
  authRequest,
  authUser_read,

  // Pub readById
  readById,
];

// ****************** //
// ***** Update ***** //
// ****************** //
export const updateHandlers = [
  // Auth request can update
  authRequest,
  // Use image storage
  image,
  authUser_update,

  // Pub updateById
  updateById,
];

// ****************** //
// ***** Delete ***** //
// ****************** //
export const deleteHandlers = [
  // Auth request can delete
  authRequest,
  authUser_delete,

  // Pub deleteById
  deleteById,
];

// ************************ //
// ***** Delete Image ***** //
// ************************ //
export const deleteImageHandlers = [
  // Auth request can delete
  authRequest,
  authUser_deleteImage,

  // Pub deleteById
  deleteImageById,
];

// **************** //
// ***** Find ***** //
// **************** //
export const findHandlers = [
  // Auth request can find
  authRequest,
  authUser_find,

  // Pub find
  find,
];

// ***************** //
// ***** React ***** //
// ***************** //
export const reactHandlers = [
  // Auth request can react
  authRequest,
  authUser_react,

  // Pub react
  react,
];

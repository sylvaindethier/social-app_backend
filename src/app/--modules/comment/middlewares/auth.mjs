import {
  is_authUser_id,
  is_authUser_admin,
  is_authUser_moder,
} from "../../middlewares/lib/authUser.mjs";
import { request_id_creator } from "../controller.mjs";
import { file_path__remove } from "./image.mjs";

/**
 * Auth user is request creator
 * @param {Request} req The request
 * @returns {Promise<Boolean>} Whether or not the auth user id is the creator
 */
async function is_authUser_creator(req) {
  const creator = await request_id_creator(req);
  // console.log("/pub/middlewares/auth::is_authUser_creator", { creator });
  return is_authUser_id(req, creator);
}

// **************************** //
// ***** Auth User create ***** //
// **************************** //
export function authUser_create(req, res, next) {
  // console.log("/pub/middlewares/auth::authUser_create", "next()");
  next();
}

// ************************** //
// ***** Auth User read ***** //
// ************************** //
export async function authUser_read(req, res, next) {
  // console.log("/pub/middlewares/auth::authUser_read", "next()");
  next();
}

// **************************** //
// ***** Auth User update ***** //
// **************************** //
export async function authUser_update(req, res, next) {
  const is_creator = await is_authUser_creator(req);

  // Can update when auth user is creator
  const canUpdate = is_creator;
  if (!canUpdate) {
    // remove file if any
    if (req.file) {
      file_path__remove(req.file.path);
      delete req.file;
    }
    const message = "Unauthorized. Can NOT update";
    console.error("/pub/middlewares/auth::authUser_update", { message });
    return res.status(401).json({ message });
  }

  // Can update `title` when auth user is creator
  const canUpdate_title = is_creator;
  if (!canUpdate_title && req.body.title) {
    const message = "Unauthorized. Can NOT update `title`";
    console.error("/pub/middlewares/auth::authUser_update", { message });
    delete req.body.title;
  }

  // Can update `text` when auth user is creator
  const canUpdate_text = is_creator;
  if (!canUpdate_text && req.body.text) {
    const message = "Unauthorized. Can NOT update `text`";
    console.error("/pub/middlewares/auth::authUser_update", { message });
    delete req.body.text;
  }

  // Can update req.file when auth user is creator
  const canUpdate_image = is_creator;
  if (!canUpdate_image && req.file) {
    const message = "Unauthorized. Can NOT update `file`";
    console.error("/pub/middlewares/auth::authUser_update", { message });
    file_path__remove(req.file.path);
    delete req.file;
  }

  // console.log("/pub/middlewares/auth::authUser_update", "next()");
  next();
}

// **************************** //
// ***** Auth User delete ***** //
// **************************** //
export async function authUser_delete(req, res, next) {
  const is_creator = await is_authUser_creator(req);
  const is_admin = is_authUser_admin(req);
  const is_moder = is_authUser_moder(req);
  // console.log("/pub/middlewares/auth::authUser_delete", {
  //   is_creator,
  //   is_admin,
  //   is_moder,
  // });

  // Can delete when auth user is creator OR is admin OR is moder
  const canDelete = is_creator || is_admin || is_moder;
  if (!canDelete) {
    const message = "Unauthorized. Can NOT delete";
    console.error("/pub/middlewares/auth::authUser_delete", { message });
    return res.status(401).json({ message });
  }

  // console.log("/pub/middlewares/auth::authUser_delete", "next()");
  next();
}

// ********************************* //
// ***** Auth User deleteImage ***** //
// ********************************* //
export async function authUser_deleteImage(req, res, next) {
  const is_creator = await is_authUser_creator(req);
  const is_admin = is_authUser_admin(req);
  const is_moder = is_authUser_moder(req);
  // console.log("/pub/middlewares/auth::authUser_deleteImage", {
  //   is_creator,
  //   is_admin,
  //   is_moder,
  // });

  // Can delete image when auth user is creator OR is admin OR is moder
  const canDeleteImage = is_creator || is_admin || is_moder;
  if (!canDeleteImage) {
    const message = "Unauthorized. Can NOT delete image";
    console.error("/pub/middlewares/auth::authUser_deleteImage", { message });
    return res.status(401).json({ message });
  }

  // console.log("/pub/middlewares/auth::authUser_deleteImage", "next()");
  next();
}

// ************************** //
// ***** Auth User find ***** //
// ************************** //
export async function authUser_find(req, res, next) {
  // console.log("/pub/middlewares/auth::authUser_find", "next()");
  next();
}

// *************************** //
// ***** Auth User react ***** //
// *************************** //
export async function authUser_react(req, res, next) {
  // console.log("/pub/middlewares/auth::authUser_react", "next()");
  next();
}

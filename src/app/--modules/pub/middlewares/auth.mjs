const FILE_PATH = "/app/components/pub/middlewares/auth";
import {
  is_authUser_id,
  is_authUser_admin,
  is_authUser_moder,
} from "../../../lib/authUser.mjs";
import { remove as filePath__remove } from "../../../lib/uploads.mjs";
import { request_id_creator } from "../controller.mjs";

/**
 * Auth user is request creator
 * @param {Request} req The request
 * @returns {Promise<Boolean>} Whether or not the auth user id is the creator
 */
async function is_authUser_creator(req) {
  const FUNCTION_PATH = `${FILE_PATH}::is_authUser_creator`;
  const creator = await request_id_creator(req);
  console.log(FUNCTION_PATH, { creator });
  return is_authUser_id(req, creator);
}

// **************************** //
// ***** Auth User create ***** //
// **************************** //
export function authUser_create(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_create`;
  // console.log(FUNCTION_PATH, "next()");
  next();
}

// ************************** //
// ***** Auth User read ***** //
// ************************** //
export async function authUser_read(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_read`;
  // console.log(FUNCTION_PATH, "next()");
  next();
}

// **************************** //
// ***** Auth User update ***** //
// **************************** //
export async function authUser_update(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_update`;
  const is_creator = await is_authUser_creator(req);

  // Can update when auth user is creator
  const canUpdate = is_creator;
  if (!canUpdate) {
    // remove file if any
    if (req.file) {
      filePath__remove(req.file.path);
      delete req.file;
    }
    const message = "Unauthorized. Can NOT update";
    console.error(FUNCTION_PATH, { message });
    return res.status(401).json({ message });
  }

  // Can update `title` when auth user is creator
  const canUpdate_title = is_creator;
  if (!canUpdate_title && req.body.title) {
    const message = "Unauthorized. Can NOT update `title`";
    console.error(FUNCTION_PATH, { message });
    delete req.body.title;
  }

  // Can update `text` when auth user is creator
  const canUpdate_text = is_creator;
  if (!canUpdate_text && req.body.text) {
    const message = "Unauthorized. Can NOT update `text`";
    console.error(FUNCTION_PATH, { message });
    delete req.body.text;
  }

  // Can update req.file when auth user is creator
  const canUpdate_image = is_creator;
  if (!canUpdate_image && req.file) {
    const message = "Unauthorized. Can NOT update `file`";
    console.error(FUNCTION_PATH, { message });
    filePath__remove(req.file.path);
    delete req.file;
  }

  // console.log(FUNCTION_PATH, "next()");
  next();
}

// **************************** //
// ***** Auth User delete ***** //
// **************************** //
export async function authUser_delete(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_delete`;
  const is_creator = await is_authUser_creator(req);
  const is_admin = is_authUser_admin(req);
  const is_moder = is_authUser_moder(req);
  // console.log(FUNCTION_PATH, { is_creator, is_admin, is_moder });

  // Can delete when auth user is creator OR is admin OR is moder
  const canDelete = is_creator || is_admin || is_moder;
  if (!canDelete) {
    const message = "Unauthorized. Can NOT delete";
    console.error(FUNCTION_PATH, { message });
    return res.status(401).json({ message });
  }

  // console.log(FUNCTION_PATH, "next()");
  next();
}

// ********************************* //
// ***** Auth User deleteImage ***** //
// ********************************* //
export async function authUser_deleteImage(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_deleteImage`;
  const is_creator = await is_authUser_creator(req);
  const is_admin = is_authUser_admin(req);
  const is_moder = is_authUser_moder(req);
  // console.log(FUNCTION_PATH, { is_creator, is_admin, is_moder });

  // Can delete image when auth user is creator OR is admin OR is moder
  const canDeleteImage = is_creator || is_admin || is_moder;
  if (!canDeleteImage) {
    const message = "Unauthorized. Can NOT delete image";
    console.error(FUNCTION_PATH, { message });
    return res.status(401).json({ message });
  }

  // console.log(FUNCTION_PATH, "next()");
  next();
}

// ************************** //
// ***** Auth User find ***** //
// ************************** //
export async function authUser_find(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_find`;
  // console.log(FUNCTION_PATH, "next()");
  next();
}

// *************************** //
// ***** Auth User react ***** //
// *************************** //
export async function authUser_react(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::authUser_react`;
  // console.log(FUNCTION_PATH, "next()");
  next();
}

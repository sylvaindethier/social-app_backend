const FILE_PATH = "/app/modules/user/routes/controller";

import { User, Role } from "../model.mjs";
import { CustomError as UserError, responseError } from "#app/lib/error.mjs";

const User__notFound_id = (id) => (doc) => {
  if (null !== doc) {
    return doc;
  }

  throw UserError(`User not found for id '${id}'`, { status: 404 });
};

const User__notFound_name = (name) => (doc) => {
  if (null !== doc) {
    return doc;
  }

  throw UserError(`User not found for name "${name}"`, { status: 404 });
};

const User__notFound = (doc) => {
  if (null !== doc) {
    return doc;
  }

  throw UserError("User not found", { status: 404 });
};

const User__invalid_password = (password) => (doc) => {
  if (null !== doc) {
    const { password_hash } = doc;
    if (User.password__compare(password, password_hash)) {
      return doc;
    }
  }

  throw UserError("Invalid credentials", { status: 401 });
};

async function request_props(req) {
  const FUNCTION_PATH = `${FILE_PATH}::request_props`;
  // User props from request body
  const { email, password, password_confirm, role_name } = req.body;
  const files = req.files;

  const props = {};

  // email is provided
  if (email) {
    props.email = email;
    // console.log(FUNCTION_PATH, "props", { email });
  }

  // password is provided
  if (password) {
    // password & password_confirm MUST be equals
    if (password !== password_confirm) {
      throw UserError("Invalid password confirm", { status: 400 });
    }

    const password_hash = User.password__hash(password);
    props.password_hash = password_hash;
    // console.log(FUNCTION_PATH, "props", { password_hash });
  }

  // role_name is provided
  if (role_name) {
    const role = await Role.findOne({ name: role_name });
    if (!role) {
      throw UserError("Invalid role", { status: 400 });
    }

    props.role = role;
    // console.log(FUNCTION_PATH, "props", { role });
  }

  // files is provided
  if (files) {
    for (const [fieldname, fieldname_files] of Object.entries(files)) {
      // console.log(FUNCTION_PATH, { fieldname, fieldname_files });
      const key = `${fieldname}_path`;
      const file_path = fieldname_files[0].path;
      props[key] = file_path;
      // console.log(FUNCTION_PATH, "props", { [key]: file_path });
    }
  }

  // console.log(FUNCTION_PATH, props);
  return props;
}

import { requestInfo } from "#app/lib/info.mjs";
// import { request_id, request_name } from "../request.mjs";


// ****************** //
// ***** delete ***** //
// ****************** //
import { authUser_id, authUser_id__is } from "../authUser.mjs";
/** Delete a User by id */
export async function deleteById(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::deleteById`;
  requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log(FUNCTION_PATH, id);
    const doc = await User.findByIdAndDelete(id);

    // User not found
    User__notFound_id(id)(doc);

    // Remove picture file
    filePath__remove(doc.picture_path);
    // Remove banner file
    filePath__remove(doc.banner_path);

    // Send response
    console.info(FUNCTION_PATH, id, doc);
    // next middleware (authClear) when auth user is request id
    if (authUser_id__is({ req, res }, id)) {
      next();
    }

    return res.status(200).json(doc);
    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// **************** //
// ***** find ***** //
// **************** //
/** Find some Users */
export async function find(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::find`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    const filter = {};
    // console.log(FUNCTION_PATH, filter);
    const docs = await User.find(filter);

    // Send response
    console.info(FUNCTION_PATH, docs);
    return res.status(200).json(docs);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}


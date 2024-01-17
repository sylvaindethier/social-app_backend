const FILE_PATH = "/app/modules/user/routes/update";

import { CustomError as UserError, responseError } from "#app/lib/error.mjs";
import { requestInfo } from "#app/lib/info.mjs";
import { filePath__remove } from "#app/lib/uploads.mjs";
import { authRequest } from "#app/middlewares/auth.mjs";
import uploads from "../middlewares/uploads.mjs";
import { User } from "../model.mjs";
import { authUser_id } from "../authUser.mjs";

const handlers = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // auth Request can update
  authRequest,
  // Use uploads
  uploads,
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;

    const auth = true;
    if (!auth) {
      const error = { message: "Unauthorized. Can NOT update" };
      console.error(FUNCTION_PATH, error);
      return res.status(401).json(error);
    }

    console.log(FUNCTION_PATH, "next()");
    next();
  },

  // ********************** //
  // ***** Controller ***** //
  // ********************** //
  // Update the auth User
  async function controller(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::controller`;
    requestInfo(FUNCTION_PATH)(req);

    try {
      const id = authUser_id({ res });

      // User props from request body, files from request files
      const { email, password, password_confirm, name } = req.body;
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

      // name is provided
      if (name) {
        props.name = name;
        // console.log(FUNCTION_PATH, "props", { name });
      }

      // files is provided
      if (files) {
        for (const [fieldname, fieldname_files] of Object.entries(files)) {
          // console.log(FUNCTION_PATH, { fieldname, fieldname_files });
          const key = `${fieldname}_path`;
          const path = fieldname_files[0].path;
          props[key] = path;
          // console.log(FUNCTION_PATH, "props", { [key]: path });
        }
      }

      // Update a User props by id
      console.log(FUNCTION_PATH, id, props);
      const docPrevious = await User.findByIdAndUpdate(id, props);

      // User not found
      if (null === docPrevious) {
        throw UserError("User not found", { status: 404 });
      }

      // Remove previous doc profile_path file when new profile_path
      if (props.profile_path && docPrevious.profile_path) {
        filePath__remove(docPrevious.profile_path);
      }
      // Remove previous doc banner_path file if new banner_path
      if (props.banner_path && docPrevious.banner_path) {
        filePath__remove(docPrevious.banner_path);
      }

      // updated User doc
      const doc = await User.findById(id);

      // Send response
      console.info(FUNCTION_PATH, id, doc);
      return res.status(201).json(doc);

      // Error
    } catch (error) {
      return responseError(FUNCTION_PATH, error)(res);
    }
  },
];
export default handlers;

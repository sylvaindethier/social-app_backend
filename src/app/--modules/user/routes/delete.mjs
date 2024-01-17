const FILE_PATH = "/app/modules/user/routes/delete";

import { CustomError as UserError, responseError } from "#app/lib/error.mjs";
import { requestInfo } from "#app/lib/info.mjs";
import { authRequest, authReset } from "#app/middlewares/auth.mjs";
import { authUser__is_admin, authUser_query } from "../authUser.mjs";
import { request_query, request_query__delete } from "../request.mjs";
import { User } from "../model.mjs";

const handlers = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // auth Request can delete
  authRequest,
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;

    const is_admin = authUser__is_admin({ req, res });
    console.log(FUNCTION_PATH, { is_admin });

    // Can delete when auth User is admin
    const auth_query = is_admin;
    if (!auth_query) {
      const message = "Unauthorized. Can NOT delete";
      console.error(FUNCTION_PATH, { message });
      request_query__delete(req);
    }

    console.log(FUNCTION_PATH, "next()");
    next();
  },

  // ********************** //
  // ***** Controller ***** //
  // ********************** //
  async function controller(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::controller`;
    requestInfo(FUNCTION_PATH)(req);

    try {
      const query = request_query(req) ?? authUser_query({ res });
      const doc = await User.findOneAndDelete(query);

      // User not found
      if (null === doc) {
        throw UserError("User not found", { status: 404, query });
      }

      // Remove picture file
      filePath__remove(doc.picture_path);
      // Remove banner file
      filePath__remove(doc.banner_path);

      // Send response
      console.info(FUNCTION_PATH, doc);
      // next middleware when auth user is document id
      if (!authUser_id__is({ req, res }, doc.id)) {
        return res.status(200).json(doc);
      }
      next();

      // Error
    } catch (error) {
      return responseError(FUNCTION_PATH, error)(res);
    }
  },

  // ******************************** //
  // ***** Authorization Reset ***** //
  // ******************************* //
  authReset,
];
export default handlers;

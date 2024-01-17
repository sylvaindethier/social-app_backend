const FILE_PATH = "/app/modules/user/routes/update_role";

import { CustomError as UserError, responseError } from "#app/lib/error.mjs";
import { requestInfo } from "#app/lib/info.mjs";
import { authRequest } from "#app/middlewares/auth.mjs";
import {
  authUser__is_admin,
  authUser_id,
  authUser_query,
} from "../authUser.mjs";
import { request_query } from "../request.mjs";
import { User, Role } from "../model.mjs";

const handlers = [
  // ************************* //
  // ***** Authorization ***** //
  // ************************* //
  // auth Request can update role
  authRequest,
  function can(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::can`;

    const is_admin = authUser__is_admin({ req, res });
    console.log(FUNCTION_PATH, { is_admin });

    // admin auth User can update role
    const can = is_admin;
    if (!can) {
      const error = { message: "Unauthorized. Can NOT update role" };
      console.error(FUNCTION_PATH, error);
      return res.status(401).json(error);
    }

    console.log(FUNCTION_PATH, "next()");
    next();
  },

  // ********************** //
  // ***** Controller ***** //
  // ********************** //
  // Update a User role
  async function controller(req, res, next) {
    const FUNCTION_PATH = `${FILE_PATH}::controller`;
    requestInfo(FUNCTION_PATH)(req);

    try {
      // query from request OR auth User
      const query = request_query(req) ?? authUser_query({ res });
      const doc = await User.findOne(query);

      // User not found
      if (null === doc) {
        throw UserError("User not found", { status: 404, query });
      }

      // `role` as name from request
      const name = req.body.role;
      const role = await Role.findOne({ name });
      if (!role) {
        throw UserError("Role nor found", { status: 400, name });
      }

      // set User `role` & save
      doc.role = role;
      const docNew = await doc.save();

      // Send response
      console.info(FUNCTION_PATH, doc, docNew);
      return res.status(201).json(doc);

      // Error
    } catch (error) {
      return responseError(FUNCTION_PATH, error)(res);
    }
  },
];
export default handlers;

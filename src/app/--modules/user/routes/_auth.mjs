const FILE_PATH = "/app/modules/user/routes/auth";

/**
 * @typedef {import("../authUser.mjs").AuthStore_Partial} AuthStore_Partial
 */

/**
 * @typedef {Object} AuthUser__is
 * @property {Boolean} is_request_id Whether or not the auth User is Request id
 * @property {Boolean} is_admin Whether or not the auth User is "admin"
 */

import { authUser__is_admin } from "../authUser.mjs";
import { authUser__is_request_id } from "../request.mjs";

/**
 * auth User is
 * @param {AuthStore_Partial} store
 * @returns {AuthUser__is} The auth User is
 */
function authUser__is(store) {
  const is_request_id = authUser__is_request_id(store);
  const is_admin = authUser__is_admin(store);
  return { is_request_id, is_admin };
}


// ******************** //
// ***** Can find ***** //
// ******************** //
export function can_find(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::can_find`;

  // All auth Request can find

  // console.log(FUNCTION_PATH, "next()");
  next();
}

// ********************** //
// ***** Can logout ***** //
// ********************** //
export function can_logout(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::can_logout`;

  // All Request can logout

  // console.log(FUNCTION_PATH, "next()");
  next();
}

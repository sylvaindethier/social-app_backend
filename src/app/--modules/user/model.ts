const FILE_PATH = "./app/modules/user/model";

import { Schema, model } from "mongoose";
import type { Model, Document} from "mongoose";

// Role
import { Role } from "#app/modules/role/model.ts";
import type {
  RoleInterface,
  RoleName,
} from "#app/modules/role/model.ts";

// **************** //
// ***** User ***** //
// **************** //
export interface UserInterface {
  email: string;
  passwordHash: string;
  role?: RoleInterface;
  username?: string;
  profile_path?: string;
  banner_path?: string;
}

export type UserWith_password = Omit<UserInterface, "passwordHash"> & {
  password: string;
};
async function from_password({ password, ...rest }: UserWith_password) {
  const passwordHash = await User.password__hash(password);
  return { ...rest, passwordHash };
}

// * ** User Methods *** //
interface UserMethods {}

// *** User Document *** //
// import type { Document, HydratedDocument } from "mongoose";
// type UserDocument = Document<unknown, {}, UserInterface> & UserInterface & {
//   _id: Types.ObjectId;
// };
// type UserHydratedDocument = HydratedDocument<UserInterface, UserMethods>;

// *** User Model (statics) *** //
export interface UserModel extends Model<UserInterface, {}, UserMethods> {
  email__validate(value: string): ReturnType<typeof email__validate>;
  password__hash(password: string): ReturnType<typeof password__hash>;
  password__compare(
    password: string,
    passwordHash: string
  ): ReturnType<typeof password__compare>;
  from_password({
    password,
    ...rest
  }: UserWith_password): ReturnType<typeof from_password>;
  username__validate(value: string): ReturnType<typeof username__validate>;
}

// *** User Schema *** //
export const UserSchema = new Schema<UserInterface, UserModel, UserMethods>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: email__validate,
      transform: email__sanitize,
    },

    passwordHash: {
      type: String,
      required: true,
      transform: (/* passwordHash: string */) => null,
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      default: await (async () => {
        console.debug(`${FILE_PATH}::UserSchema.role.default`);
        // find Role "standard" as default User `role`
        const name: RoleName = "standard";
        const role = await Role.findOne({ name });
        if (null === role) {
          const message = `Role "${name}" not found`;
          console.error(message);
          throw Error(message);
        }
        return role;
      })(),
      transform: (role: Document) => role.toJSON(),
      autopopulate: true,
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      default: (doc: Document) => `user_${doc.id}`,
      validate: username__validate,
    },

    profile_path: { type: String },
    banner_path: { type: String },
  },
  {
    timestamps: true,

    toJSON: {
      // @ts-expect-error: `doc` & `options` nerver read
      transform: (doc, { _id, __v, ...json }, options) => json,
    },

    /** Statics */
    statics: {
      email__validate,
      password__compare,
      password__hash,
      from_password,
      username__validate,
    },

    // /** Methods */
    // methods: {},
  }
);

// *** Password encryption *** //
import { hash, compare } from "bcrypt";
const hash_rounds = 20;
/**
 * Hash a password
 * @param {string} password
 * @returns {string} The password hash
 */
async function password__hash(password: string): Promise<string> {
  const FUNCTION_PATH = `${FILE_PATH}::password__hash`;
  console.debug(`>>> ${FUNCTION_PATH}`);
  return await hash(password, hash_rounds);
}
/**
 * Compare a password against a passwordHash
 * @param {string} password
 * @param {string} passwordHash
 * @returns {boolean} Whether or not the password compare to a passwordHash
 */
async function password__compare(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const FUNCTION_PATH = `${FILE_PATH}::password__compare`;
  console.debug(`>>> ${FUNCTION_PATH}`);
  return await compare(password, passwordHash);
}

// *** Props functions *** //
const emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/**
 * Validate a string to email
 * @param {string} value The value to validate
 * @returns {boolean} Whether or not the value is a valid email
 */
function email__validate(value: string): boolean {
  return emailRegExp.test(value);
}
/**
 * Sanitize an email
 * @param {string} email The email to sanitize
 * @returns {string} The sanitized email
 */
function email__sanitize(email: string): string {
  const at = email.split("@");
  const domain = at.pop() ?? "";
  const name = at.join("@");

  return `${email_name__sanitize(name)}@${email_domain__sanitize(domain)}`;
}
function email_name__sanitize(name: string): string {
  return `${name.slice(0, 3)}${"*".repeat(3)}`;
  // return name.replace(/.{1,4}$/, "*".repeat(4));
}
function email_domain__sanitize(domain: string): string {
  const dot = domain.split(".");
  const tld = dot.pop();
  // const name = dot.join(".").replace(/.{1,4}$/, "*".repeat(4));
  const name = "*".repeat(3);
  return `${name}.${tld}`;
}

const usernameRegExp = /^.*$/;
/**
 * Validate a string to username
 * @param {string} value The value to validate
 * @returns {boolean} Whether or not the value is a valid username
 */
function username__validate(value: string): boolean {
  return usernameRegExp.test(value);
}

// *** Plugins *** //
// use UniqueValidator plugin
// @see https://www.npmjs.com/package/mongoose-unique-validator
import mongooseUniqueValidator from "mongoose-unique-validator";
UserSchema.plugin(mongooseUniqueValidator);

// use AutoPopulate plugin
// @see https://plugins.mongoosejs.io/plugins/autopopulate
import mongooseAutoPopulate from "mongoose-autopopulate";
// @ts-expect-error: type of mongooseAutoPopulate not assignable to PluginFunction
UserSchema.plugin(mongooseAutoPopulate);

/** User model */
export const User = model<UserInterface, UserModel>("User", UserSchema);
export default User;

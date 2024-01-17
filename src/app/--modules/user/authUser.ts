// const FILE_PATH = "./app/modules/user/authUser";

import { auth_get, auth_add } from "#app/auth/auth.ts";
import type { AuthStore } from "#app/auth/auth.ts";
import { RoleName } from "#app/modules/role/model.ts";

/** AuthUser */
type AuthUser = {
  id: string;
  role: RoleName;
};

/**
 * Set the auth `user`
 * @param {AuthStore} store
 * @param {AuthUser} user The auth `user` to set
 */
export const authUserSet = (store: AuthStore, user: AuthUser) => auth_add(store, { user });


/**
 * Get the auth `user`
 * @param {AuthStore} store
 * @returns {AuthUser | undefined} The auth `user` if any
 */
export const authUserGet = (store: AuthStore): AuthUser | undefined => auth_get(store)?.["user"];


const is = (value: any, compare: any): boolean => value && value === compare;

/**
 * Get the auth user `id`
 * @param {AuthStore} store
 * @returns {AuthUser["id"] | undefined} The auth user `id`
 */
export const authUser_id = (store: AuthStore): AuthUser["id"] | undefined => authUserGet(store)?.id;


/**
 * Compare the auth user `id` with the provided id
 * @param {AuthStore} store
 * @param {string} id The id to compare with
 * @returns {boolean} Whether or not the auth user `id` is the id
 */
export const authUserIs_id = (store: AuthStore, id: string): boolean => is(id, authUser_id(store));


/**
 * Get the auth user `role`
 * @param {AuthStore} store
 * @returns {AuthUser["role"] | undefined} The auth user `role`
 */
export const authUser_role = (store: AuthStore): AuthUser["role"] | undefined => authUserGet(store)?.role;

/**
 * Compare the auth user `role` with the provided role
 * @param {AuthStore} store
 * @param {string} role The role to compare with
 * @returns {boolean} Whether or not the auth user `role` is the provided role
 */
export const authUserIs_role = (store: AuthStore, role: string): boolean => is(role, authUser_role(store));

/**
 * The auth user `role` is "admin"
 * @param {AuthStore} store
 * @returns {boolean} Whether or not the auth user `role` is "admin"
 */
export const authUserIs_admin = (store: AuthStore): boolean => authUserIs_role(store, "admin");

/**
 * The auth user `role` is "moder"
 * @param {AuthStore} store
 * @returns {boolean} Whether or not the auth user `role` is "moder"
 */
export const authUserIs_moder = (store: AuthStore): boolean => authUserIs_role(store, "moder");

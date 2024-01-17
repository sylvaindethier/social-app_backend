/**
 * Get & validate an environment variable
 * @param {string} key The key of process.env to get the value
 * @returns {string} The process.env value
 * @throws {Error} When the process.env value is undefined or empty
 */
export function env(key: string): string {
  const value = process.env[key];
  if (undefined === value || 0 === value.length) {
    throw Error(`Missing environment variable "${key}"`);
  }
  return value;
}

const NODE_ENV = env("NODE_ENV");
export const is_DEV = NODE_ENV === "dev" || NODE_ENV === "development";
export const is_TEST = NODE_ENV === "test";
export const is_PROD = NODE_ENV === "prod" || NODE_ENV === "production";

// configure dotenv for the NODE_ENV
import { resolve } from "node:path";
import { config } from "dotenv";
const file = `.env.${NODE_ENV}.local`;
const path = resolve(process.cwd(), file);
export default config({ path });

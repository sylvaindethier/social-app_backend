/**
 * Throws Error for User not found
 * @param {string}cause
 * @throws {Error}
 */
export function __throw_notFound(cause: string = "") {
  const message = "User not found";
  console.error(message, cause);
  throw new Error(message, { cause });
}

export function user_notFound(doc: any, cause: string = "") {
  if (null === doc) {
    const message = "User not found";
    console.error(message, cause);
    throw new Error(message, { cause });
  }
}

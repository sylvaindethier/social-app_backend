const FILE_PATH = "/app/components/pub/controller";
import Pub from "./model.mjs";
import { authUser_id } from "../../lib/authUser.mjs";

import { CustomError, responseError } from "../../lib/error.mjs";
const PubError = CustomError;
const Pub__notFound_id = (id) => (doc) => {
  if (null !== doc) {
    return doc;
  }
  throw PubError(`Pub not found for id '${id}'`, { status: 404 });
};

/**
 * Get `id` from request in order: params, body, query
 * @param {Request} req The request to get the `id` from
 * @returns {string | undefined} The request `id`
 */
export function request_id(req) {
  // Extract `id` from request params, body, query
  return req.params?.id || req.body?.id || req.query?.id;
}

/**
 * Get request id creator (Pub `created_by`)
 * @param {Request} req The request
 * @returns {Promise<string | undefined>} The request id creator
 */
export async function request_id_creator(req) {
  const FUNCTION_PATH = `${FILE_PATH}::request_id_creator`;
  const id = request_id(req);
  const doc = await Pub.findById(id).populate("created_by");
  // console.log(FUNCTION_PATH, { id, doc });
  Pub__notFound_id(id)(doc);
  const creator = doc.created_by?.id;
  return creator;
}

async function request_props(req) {
  const { title, text } = req.body;
  const image_path = req.file?.path;

  const props = {};

  // title is provided
  if (title) {
    // // Validate title
    // if (!Pub.title__isValid(title)) {
    //   throw PubError("Invalid title", { status: 400, title });
    // }

    // populate props with title
    props.title = title;
  }

  // text is provided
  if (text) {
    // // Validate text
    // if (!Pub.text__isValid(text)) {
    //   throw PubError("Invalid text", { status: 400, text });
    // }

    // populate props with text
    props.text = text;
  }

  // image_path name is provided
  if (image_path) {
    // // Validate image_path
    // if (!Pub.image_path__isValid(image_path)) {
    //   throw PubError("Invalid image_path", { status: 400, image_path });
    // }

    // populate props with image_path
    props.image_path = image_path;
  }

  return props;
}

import { requestInfo } from "../../lib/info.mjs";

// ****************** //
// ***** Create ***** //
// ****************** //
/** Create a Pub */
export async function create(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::create`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request props
    const props = await request_props(req);
    // Auth User id as created_by
    props.created_by = authUser_id(req);

    // Pub create
    // console.log(FUNCTION_PATH, props);
    const doc = await Pub.create(props);

    // Pub populate "created_by"
    await doc.populate("created_by");

    // Send response
    console.info(FUNCTION_PATH, doc);
    return res.status(201).json(doc);

    // Error
  } catch (error) {
    error.status = 401;
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// ********************* //
// ***** Find/Read ***** //
// ********************* //
/** Find/Read a Pub by id */
export async function findById(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::findById`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log(FUNCTION_PATH, id);
    const doc = await Pub.findById(id);

    // Pub not found
    Pub__notFound_id(id)(doc);

    // Pub populate "created_by"
    await doc.populate("created_by");

    // Send response
    console.info(FUNCTION_PATH, id, doc);
    return res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}
export const readById = findById;

// ****************** //
// ***** Update ***** //
// ****************** //
/** Update Pub by id */
export async function updateById(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::updateById`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);
    // Extract request props
    const props = await request_props(req);

    // Pub update by id, props
    // console.log(FUNCTION_PATH, id, props);
    const docPrevious = await Pub.findByIdAndUpdate(id, props);

    // Pub not found
    Pub__notFound_id(id)(docPrevious);

    // Remove previous doc image if new image
    if (props.image_path) {
      docPrevious.image_path__remove();
    }

    // Pub get updated doc
    // Pub populate "created_by"
    const doc = await Pub.findById(docPrevious.id).populate("created_by");

    // Send response
    console.info(FUNCTION_PATH, id, doc);
    return res.status(201).json(doc);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// ****************** //
// ***** Delete ***** //
// ****************** //
/** Delete Pub by id */
export async function deleteById(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::deleteById`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log(FUNCTION_PATH, id);
    const doc = await Pub.findByIdAndDelete(id);

    // Pub not found
    Pub__notFound_id(id)(doc);

    // Remove image
    doc.image_path__remove();

    // Send response
    console.info(FUNCTION_PATH, id, doc);
    return res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// ************************ //
// ***** Delete Image ***** //
// ************************ //
/** Delete Pub Image by id */
export async function deleteImageById(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::deleteImageById`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log(FUNCTION_PATH, id);
    const docPrevious = await Pub.findById(id);

    // Pub not found
    Pub__notFound_id(id)(docPrevious);

    // Remove image
    docPrevious.image_path__remove();
    const doc = await docPrevious.save();

    // Send response
    console.info(FUNCTION_PATH, id, doc);
    res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// **************** //
// ***** Find ***** //
// **************** //
/** Find some Pub */
export async function find(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::find`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    const filter = {};
    // console.log(FUNCTION_PATH, filter);

    // Pub find filter
    // Pub populate "created_by"
    const docs = await Pub.find(filter).populate("created_by");

    // Send response
    console.info(FUNCTION_PATH, docs);
    res.status(200).json(docs);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

// ***************** //
// ***** React ***** //
// ***************** //
/** React on a Pub */
export async function react(req, res, next) {
  const FUNCTION_PATH = `${FILE_PATH}::react`;
  // requestInfo(FUNCTION_PATH)(req);

  try {
    // Extract request id
    const id = request_id(req);
    const filter = {};

    // console.log(FUNCTION_PATH, filter);
    // Pub find filter
    // Pub populate "created_by"
    const docs = await Pub.find(filter).populate("created_by");

    // Send response
    console.info(FUNCTION_PATH, docs);
    res.status(200).json(docs);

    // Error
  } catch (error) {
    return responseError(FUNCTION_PATH, error)(res);
  }
}

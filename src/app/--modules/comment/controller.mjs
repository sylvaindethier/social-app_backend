import Pub from "./model.mjs";
import { authUser_id } from "../middlewares/lib/authUser.mjs";

import { CustomError, responseError } from "../lib.mjs";
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
  const id = request_id(req);
  const doc = await Pub.findById(id).populate("created_by");
  // console.log("/pub/controller::request_id_creator", { id, doc });
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

// import { requestInfo } from "../lib.mjs";

// ****************** //
// ***** Create ***** //
// ****************** //
/** Create a Pub */
export async function create(req, res, next) {
  // requestInfo("/pub/controller::create")(req);

  try {
    // Extract request props
    const props = await request_props(req);
    // Auth User id as created_by
    props.created_by = authUser_id(req);

    // Pub create
    console.log("/pub/controller::create", props);
    const doc = await Pub.create(props);

    // Pub populate "created_by"
    await doc.populate("created_by");

    // Send response
    console.info("/pub/controller::create", doc);
    return res.status(201).json(doc);

    // Error
  } catch (error) {
    error.status = 401;
    return responseError("/pub/controller::create", error)(res);
  }
}

// **************** //
// ***** Read ***** //
// **************** //
/** Read a by id */
export async function findById(req, res, next) {
  // requestInfo("/pub/controller::findById")(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log("/pub/controller::findById", id);
    const doc = await Pub.findById(id);

    // Pub not found
    Pub__notFound_id(id)(doc);

    // Pub populate "created_by"
    await doc.populate("created_by");

    // Send response
    console.info("/pub/controller::findById", id, doc);
    return res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError("/pub/controller::findById", error)(res);
  }
}
export const readById = findById;

// ****************** //
// ***** Update ***** //
// ****************** //
/** Update Pub by id */
export async function updateById(req, res, next) {
  // requestInfo("/pub/controller::updateById")(req);

  try {
    // Extract request id
    const id = request_id(req);
    // Extract request props
    const props = await request_props(req);

    // Pub update by id, props
    // console.log("/pub/controller::updateById", id, props);
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
    console.info("/pub/controller/updateById", id, doc);
    return res.status(201).json(doc);

    // Error
  } catch (error) {
    return responseError("/pub/controller::updateById", error)(res);
  }
}

// ****************** //
// ***** Delete ***** //
// ****************** //
/** Delete Pub by id */
export async function deleteById(req, res, next) {
  // requestInfo("/pub/controller::deleteById")(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log("/pub/controller::deleteById", id);
    const doc = await Pub.findByIdAndDelete(id);

    // Pub not found
    Pub__notFound_id(id)(doc);

    // Remove image
    doc.image_path__remove();

    // Send response
    console.info("/pub/controller::deleteById", id, doc);
    return res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError("/pub/controller::deleteById", error)(res);
  }
}

// ************************ //
// ***** Delete Image ***** //
// ************************ //
/** Delete Pub Image by id */
export async function deleteImageById(req, res, next) {
  // requestInfo("/pub/controller::deleteImageById")(req);

  try {
    // Extract request id
    const id = request_id(req);

    // console.log("/pub/controller::deleteImageById", id);
    const docPrevious = await Pub.findById(id);

    // Pub not found
    Pub__notFound_id(id)(docPrevious);

    // Remove image
    docPrevious.image_path__remove();
    const doc = await docPrevious.save();

    // Send response
    console.info("/pub/controller::deleteImageById", id, doc);
    res.status(200).json(doc);

    // Error
  } catch (error) {
    return responseError("/pub/controller::deleteImageById", error)(res);
  }
}

// **************** //
// ***** Find ***** //
// **************** //
/** Find some Pub */
export async function find(req, res, next) {
  // requestInfo("/pub/controller::find")(req);

  try {
    const filter = {};

    // console.log("/user/controller::find", filter);
    // Pub find filter
    // Pub populate "created_by"
    const docs = await Pub.find(filter).populate("created_by");

    // Send response
    console.info("/pub/controller::find", docs);
    res.status(200).json(docs);

    // Error
  } catch (error) {
    return responseError("/pub/controller::find", error)(res);
  }
}

// // ***************** //
// // ***** React ***** //
// // ***************** //
// /** React on a Pub */
// export async function react(req, res, next) {
//   // requestInfo("/pub/controller::react")(req);

//   try {
//     // Extract request id
//     const id = request_id(req);
//     const filter = {};

//     // console.log("/user/controller::find", filter);
//     // Pub find filter
//     // Pub populate "created_by"
//     const docs = await Pub.find(filter).populate("created_by");

//     // Send response
//     console.info("/pub/controller::find", docs);
//     res.status(200).json(docs);

//     // Error
//   } catch (error) {
//     return responseError("/pub/controller::find", error)(res);
//   }
// }

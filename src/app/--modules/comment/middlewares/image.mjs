import multer from "multer";
import { unlinkSync } from "fs";

export const PUB_IMAGE_DIR = `${process.env.UPLOADS_DIR}/pub/images`;

const FIELD_NAME = "image";
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

/**
 * Remove a file path
 * @param {string} file_path The file path to remove
 */
export function file_path__remove(file_path) {
  try {
    console.info("/pub/middlewares/image::file_path__remove", file_path);
    unlinkSync(file_path);
  } catch (error) {
    console.error("/pub/middlewares/image::file_path__remove", error);
  }
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // console.log("/pub/middlewares/image::multer.diskStorage.destination", PUB_IMAGE_DIR);
    cb(null, PUB_IMAGE_DIR);
  },

  filename(req, file, cb) {
    // File name with no spaces (replaced by underscore)
    const name = file.originalname.replaceAll(" ", "_");
    // File prefix with the Date (as ISO)
    const prefix = new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replaceAll(".", "-");
    const filename = `${prefix}--${name}`;

    // console.log("/pub/middlewares/image::multer.diskStorage.filename", filename);
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // Accept file with registered mimetype
  const accept = !!MIME_TYPES[file.mimetype];
  // console.log("/pub/middlewares/image::fileFilter", accept);
  cb(null, accept);
}

// Process single file from field name
const middleware = multer({ storage, fileFilter }).single(FIELD_NAME);
export default middleware;

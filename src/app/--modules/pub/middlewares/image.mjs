//***** Storage *****//
export const DESTINATION_DIR = `${process.env.UPLOADS_DIR}/pub/images`;
export const FIELD_NAME = "image";

import multer, {
  make_dir,
  storage,
  fileFilter,
  IMAGE_MIME_TYPES,
} from "../../../lib/uploads.mjs";

// Create destination directory
make_dir(DESTINATION_DIR);

const options = {
  storage: storage(DESTINATION_DIR),
  fileFilter: fileFilter(IMAGE_MIME_TYPES),
};
const middleware = multer(options).single(FIELD_NAME);
export default middleware;

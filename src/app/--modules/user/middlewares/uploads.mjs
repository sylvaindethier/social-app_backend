const FILE_PATH = "/app/modules/user/middlewares/uploads";

import {
  dirPath__make,
  fileFilter__mimetype_images,
  storage_filename__file,
} from "#app/lib/uploads.mjs";

// Uploads
const DESTINATION = `${process.env.UPLOADS_DIR}/user`;
const DESTINATION_profile = `${DESTINATION}/profile`;
const DESTINATION_banner = `${DESTINATION}/banner`;
// Make sure uploads destinations exist
dirPath__make(DESTINATION_profile);
dirPath__make(DESTINATION_banner);

const uploads = {
  profile: {
    maxCount: 1,
    fileFilter: (req, file) => fileFilter__mimetype_images(file),
    storage_destination: (req, file) => DESTINATION_profile,
    storage_filename: (req, file) => storage_filename__file(file),
  },
  
  banner: {
    maxCount: 1,
    fileFilter: (req, file) => fileFilter__mimetype_images(file),
    storage_destination: (req, file) => DESTINATION_banner,
    storage_filename: (req, file) => storage_filename__file(file),
  },
};

function upload__file_fieldname(fieldname) {
  const upload = uploads[fieldname];
  if (undefined === upload) {
    const message = `Unknown upload "${fieldname}"`;
    console.error(message);
    throw Error(message);
  }

  return upload;
}


import multer from "multer";
const options = {
  fileFilter(req, file, cb) {
    const FUNCTION_PATH = `${FILE_PATH}::multerOptions.fileFilter`;
    // The function should call `cb` with (error, boolean)
    // to indicate if the file should be accepted

    const upload = upload__file_fieldname(file.fieldname);
    const accept = upload.fileFilter(req, file);

    console.log(FUNCTION_PATH, file.fieldname, accept);
    cb(null, accept);
  },

  storage: multer.diskStorage({
    destination(req, file, cb) {
      const FUNCTION_PATH = `${FILE_PATH}::multerOptions.storage::destination`;
      // The function should call `cb` with (error, destination)
      // to specify the storage destination

      const upload = upload__file_fieldname(file.fieldname);
      const destination = upload.storage_destination(req, file);

      // console.log(FUNCTION_PATH, destination);
      cb(null, destination);
    },

    filename(req, file, cb) {
      const FUNCTION_PATH = `${FILE_PATH}::multerOptions.storage::filename`;
      // The function should call `cb` with (error, filename)
      // to specify the storage filename

      const upload = upload__file_fieldname(file.fieldname);
      const filename = upload.storage_filename(req, file);

      // console.log(FUNCTION_PATH, filename);
      cb(null, filename);
    },
  }),
};

const middleware = multer(options).fields([
  { name: "profile", maxCount: uploads.profile.maxCount },
  { name: "banner", maxCount: uploads.banner.maxCount },
]);
export default middleware;

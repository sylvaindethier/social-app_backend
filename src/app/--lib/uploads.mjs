const FILE_PATH = "/app/lib/uploads";
const CWD = process.cwd();
import { mkdirSync, unlinkSync } from "node:fs";

/**
 * Make a directory path
 * @param {string} dirPath The directory path to make
 */
export function dirPath__make(dirPath) {
  const FUNCTION_PATH = `${FILE_PATH}::dirPath__make`;
  try {
    const path = `${CWD}/${dirPath}`;
    console.info(FUNCTION_PATH, path);
    mkdirSync(path, { recursive: true });
  } catch (error) {
    console.error(FUNCTION_PATH, error);
  }
}
/**
 * Remove (unlink sync) a file path
 * @param {string} filePath The file path to remove
 */
export function filePath__remove(filePath) {
  const FUNCTION_PATH = `${FILE_PATH}::filePath__remove`;
  try {
    const path = `${CWD}/${filePath}`;
    console.info(FUNCTION_PATH, path);
    unlinkSync(path);
  } catch (error) {
    console.error(FUNCTION_PATH, error);
  }
}

export function storage_filename__file(file) {
  const FUNCTION_PATH = `${FILE_PATH}::storage_filename__file`;
  const prefix = storage_filename__file_prefix(file);
  const name = storage_filename__file_sanitize(file);
  const filename = `${prefix}--${name}`;
  // console.log(FUNCTION_PATH, filename, file);
  return filename;
}

function storage_filename__file_prefix(file) {
  // File prefix with the Date (as ISO)
  return new Date().toISOString().replaceAll(":", "-").replaceAll(".", "_");
}
function storage_filename__file_sanitize(file) {
  return file.originalname.replaceAll(" ", "_");
}

const MIMETYPE_images = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

// const MIMETYPE_videos = {
//   "video/mp4": "mp4",
//   "video/avi": "avi",
// };

// const MIMETYPE_pdf = {
//   "application/pdf": "pdf",
// };

export function fileFilter__mimetype_images(file) {
  const FUNCTION_PATH = `${FILE_PATH}::fileFilter__mimetype_images`;
  const accept = Boolean(MIMETYPE_images[file.mimetype]);
  // console.log(FUNCTION_PATH, accept, file);
  return accept;
}

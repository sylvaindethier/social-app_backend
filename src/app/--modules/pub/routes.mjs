import express from "express";
// Create Router
const router = express.Router();

/** @INFO: All routes require auth handler */
import { authHandler } from "../../middlewares/auth.mjs";
router.use(authHandler);

// // Use request info
// import { requestInfo } from "../lib.mjs";
// router.use(requestInfo("/pub/routes"));

// Routes Handlers
import {
  createHandlers,
  readHandlers,
  updateHandlers,
  deleteHandlers,
  deleteImageHandlers,
  findHandlers,
  reactHandlers,
} from "./routes.handlers.mjs";

// ***** Create ***** //
// * POST /create
router.post("/create", createHandlers);
// // * POST /
// router.post("/", createHandlers);

// ***** Read ***** //
// * GET /read
router.get("/read", readHandlers);
// // * GET /:id
// router.get("/:id", readHandlers);

// ***** Update ***** //
// * POST /update
router.post("/update", updateHandlers);
// // * PUT /:id
// router.put("/:id", updateHandlers);

// ***** Delete ***** //
// * POST /delete
router.post("/delete", deleteHandlers);
// // * DELETE /:id
// router.delete("/:id", deleteHandlers);

// ***** Delete Image ***** //
// * POST /delete-image
router.post("/delete-image", deleteImageHandlers);
// // * DELETE /image/:id
// router.delete("/image/:id", deleteImageHandlers);

// ***** Find ***** //
// * GET /find
router.get("/find", findHandlers);
// // * GET /
// router.get("/", findHandlers);

// // ***** React ***** //
// // * POST /react
// router.post("/react", reactHandlers);

export default router;

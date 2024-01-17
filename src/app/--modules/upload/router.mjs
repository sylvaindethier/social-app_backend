const FILE_PATH = "/app/modules/upload/router";
import express from "express";
const router = express.Router();

// Use request info
import { requestInfo } from "../../lib/info.mjs";
router.use(requestInfo(FILE_PATH));

// routes
import {
  create,
  read,
  update,
  delete__,
} from "./routes/handlers.mjs";

// ***** Create ***** //
// * POST /create
router.post("/create", create);
// // * POST /
// router.post("/", create);

// ***** Read ***** //
// * GET /read
router.get("/read", read);
// // * GET /:id
// router.get("/:id", read);

// ***** Update ***** //
// * POST /update
router.post("/update", update);
// // * PUT /:id
// router.put("/:id", update);

// ***** Delete ***** //
// * POST /delete
router.post("/delete", delete__);
// // * DELETE /:id
// router.delete("/:id", delete__);

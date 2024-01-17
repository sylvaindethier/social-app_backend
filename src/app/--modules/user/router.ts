// const FILE_PATH = "./app/modules/user/router";

import express from "express";
import type { Router } from "express";
const router: Router = express.Router();

// // Use request info
// import { requestInfo } from "#app/lib/info.ts";
// router.use(requestInfo(FILE_PATH));

// ***** Create ***** //
import create from "./routes/create.ts"
// * POST /create
router.post("/create", create);
// // * POST /
// router.post("/", create);

// ***** Read ***** //
import read from "./routes/read.ts"
// * GET /read
router.get("/read", read);
// // * GET /:name
// router.get("/:username", read);

// // ***** Update ***** //
// import update from "./routes/update.mjs"
// // * POST /update
// router.post("/update", update);
// // // * PUT /
// // router.put("/", update);

// // ***** Update role ***** //
// import update_role from "./routes/update_role.mjs"
// // * POST /update-role
// router.post("/update-role", update_role);
// // // * PUT /
// // router.put("/role", update_role);

// // ***** Delete ***** //
// import delete_ from "./routes/delete.mjs";
// // * POST /delete
// router.post("/delete", delete_);
// // // * DELETE /:id
// // router.delete("/:id", delete_);

// // ***** Find ***** //
// import find from "./routes/find.mjs";
// // * GET /find
// router.get("/find", find);
// // // * GET /
// // router.get("/", find);

// ***** Login ***** //
import login from "./routes/login.ts";
// * POST /login
router.post("/login", login);

// // ***** Logout ***** //
// import logout from "./routes/logout.mjs";
// // * POST /logout
// router.post("/logout", logout);

export default router;

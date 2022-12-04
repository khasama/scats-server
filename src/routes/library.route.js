const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/library.controller");
const { verifyUser } = require('../middlewares');

router.post("/add", verifyUser(), LibraryController.addLibrary);
router.delete("/delete", verifyUser(), LibraryController.deleteLibrary);
router.get("/:id", LibraryController.getLibrary);

module.exports = router;

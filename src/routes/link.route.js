const express = require("express");
const router = express.Router();
const LinkController = require("../controllers/link.controller");
// const { verifyToken } = require('../middlewares');

// router.get("/", StatusController.getAll);
router.post("/", LinkController.createOne);
router.put("/:id", LinkController.updateOne);
router.delete("/:id", LinkController.deleteOne);
router.get("/:id", LinkController.getInformation);

module.exports = router;

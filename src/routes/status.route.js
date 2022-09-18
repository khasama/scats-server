const express = require("express");
const router = express.Router();
const StatusController = require("../controllers/status.controller");
const { verifyToken } = require('../middlewares');

router.get("/", StatusController.getAll);
router.post("/", verifyToken(2), StatusController.createOne);
router.put("/:id", verifyToken(2), StatusController.updateOne);
router.delete("/:id", verifyToken(1), StatusController.deleteOne);
router.get("/:id", StatusController.getInformation);

module.exports = router;

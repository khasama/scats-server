const express = require("express");
const router = express.Router();
const StatusController = require("../controllers/status.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", StatusController.getAll);
router.post("/", verifyTokenManager(2), StatusController.createOne);
router.put("/:id", verifyTokenManager(2), StatusController.updateOne);
router.delete("/:id", verifyTokenManager(1), StatusController.deleteOne);
router.get("/:id", StatusController.getInformation);

module.exports = router;

const express = require("express");
const router = express.Router();
const ServerController = require("../controllers/server.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/", ServerController.getAll);
router.post("/", verifyTokenManager(2), ServerController.createOne);
router.put("/:id", verifyTokenManager(2), ServerController.updateOne);
router.delete("/:id", verifyTokenManager(1), ServerController.deleteOne);
router.get("/:id", ServerController.getInformation);

module.exports = router;

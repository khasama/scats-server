const express = require("express");
const router = express.Router();
const ServerController = require("../controllers/server.controller");
const { verifyToken } = require('../middlewares');

router.get("/", ServerController.getAll);
router.post("/", verifyToken(2), ServerController.createOne);
router.put("/:id", verifyToken(2), ServerController.updateOne);
router.delete("/:id", verifyToken(1), ServerController.deleteOne);
router.get("/:id", ServerController.getInformation);

module.exports = router;

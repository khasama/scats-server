const express = require("express");
const router = express.Router();
const LinkController = require("../controllers/link.controller");
const { verifyTokenManager } = require('../middlewares');

router.get("/full-link/:idEpisode", LinkController.getFullLink);
router.post("/", verifyTokenManager(2), LinkController.createOne);
router.put("/:id", verifyTokenManager(2), LinkController.updateOne);
router.delete("/:id", verifyTokenManager(1), LinkController.deleteOne);
router.get("/:id", LinkController.getInformation);

module.exports = router;

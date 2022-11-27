const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/room.controller");
const { verifyTokenManager, verifyUser } = require('../middlewares');

router.get("/live", RoomController.getRoomLive);
router.post("/check", RoomController.checkPass);
router.post("/my-room", verifyUser(), RoomController.getMyRoom);
router.post("/", verifyUser(), RoomController.createOne);
// router.put("/:id", CountryController.updateOne);
// router.delete("/:id", CountryController.deleteOne);
// router.get("/:id", CountryController.getInformation);

module.exports = router;

const RoomModel = require("../models/room.model");
const UserModel = require("../models/user.model");
const slug = require("slug");

const RoomService = {};

RoomService.getRoomLive = async () => {
    try {
        const rooms = await RoomModel.findAll(
            {
                attributes: ['id', 'name', 'slug', 'master', 'private', 'live'],
                where: {
                    live: true
                },
                include: [
                    {
                        model: UserModel,
                        attributes: ['id', 'email', 'username', 'avatar']
                    },
                ]
            }
        );
        return { status: "success", data: rooms };
    } catch (error) {
        throw error;
    }
};

RoomService.createOne = async (data) => {
    try {
        const hasRoom = await RoomModel.findOne({ where: { master: data.idUser } });
        if (hasRoom) return { status: "failed", message: "Bạn đã tạo room rồi" };
        let room = {
            master: parseInt(data.idUser),
            name: data.name,
            slug: slug(data.name),
            private: false
        };

        if (data.pass) room = { ...room, pass: data.pass, private: true };
        const newRoom = await RoomModel.create(room);
        return { status: "success", data: newRoom };
    } catch (error) {
        throw error;
    }
};

RoomService.getMyRoom = async (idUser) => {
    try {
        const room = await RoomModel.findOne(
            {
                attributes: ['id', 'name', 'slug', 'master', 'private', 'live'],
                where: {
                    master: idUser
                },
                include: [
                    {
                        model: UserModel,
                        attributes: ['id', 'email', 'username', 'avatar']
                    },
                ]
            }
        );
        return { status: "success", data: room };
    } catch (error) {
        throw error;
    }
};

RoomService.checkPass = async ({ id, pass }) => {
    try {
        const room = await RoomModel.findOne(
            {
                where: {
                    id,
                    pass
                },
            }
        );
        if (room) return { status: "success" };
        return { status: "failed", message: "Sai mật khẩu" };
    } catch (error) {
        throw error;
    }
};

module.exports = RoomService;

const RoomModel = require("../models/room.model");
const SocketService = {};

let rooms = [];

SocketService.init = (socket) => {
    let room = {
        id: "",
        master: "",
        video: {},
        playlist: [],
        viewers: [],
    };
    socket.on("join-room", (roomId, userId) => {
        console.log({ roomId, userId })
        if (hasRoom(roomId)) {
            addViewer(roomId, userId);
            if (Object.keys(getCurrentVideo(roomId)).length !== 0) {
                socket.emit("change-video", getCurrentVideo(roomId));
            }
            socket.to(roomId).emit('user-join-room', userId);
        } else {
            RoomModel.update(
                {
                    live: true
                },
                {
                    where: {
                        id: roomId
                    }
                }
            );
            room.id = roomId;
            room.master = userId;
            socket.emit("master");
            rooms.push(room);
        }

        socket.join(roomId);

        socket.on("change-video", (video) => {
            console.log(video);
            if (checkMaster(roomId, userId)) {
                socket.emit("master-change-video", video);
                socket.to(roomId).emit("change-video", video);
                setCurrentVideo(roomId, video);
            }
        });

        socket.on("position", (position) => {
            console.log(parseInt(position));
            socket.to(roomId).emit("position", position);
        });

        socket.on("pause", () => {
            socket.to(roomId).emit("pause");
        });

        socket.on("play", () => {
            socket.to(roomId).emit("play");
        });

        socket.on("disconnect", () => {
            if (checkMaster(roomId, userId)) {
                console.log("master-disconnect");
                removeViewer(roomId, userId);
                socket.to(roomId).emit("master-disconnect");
            } else {
                console.log("viewer-disconnect");
                removeViewer(roomId, userId);
                socket.to(roomId).emit("viewer-disconnect", userId);
            }
        });
    });
};

function hasRoom(id) {
    return rooms.findIndex((e) => e.id === id) > -1;
}

function setCurrentVideo(id, video) {
    rooms.map((room) => {
        if (room.id === id) {
            room.video = JSON.parse(video);
        }
    });
}

function getCurrentVideo(id) {
    return rooms[rooms.findIndex((e) => e.id === id)].video;
}

function addViewer(id, viewer) {
    rooms.map((room) => {
        if (room.id === id) {
            room.viewers.push(viewer);
        }
    });
}

function removeViewer(id, viewer) {
    if (checkMaster(id, viewer)) {
        rooms.splice(
            rooms.findIndex((e) => e.id === id),
            1
        );
    } else {
        rooms.map((room) => {
            if (room.id === id) {
                const index = room.viewers.indexOf(viewer);
                room.viewers.splice(index, 1);
            }
        });
    }
}

function checkMaster(id, viewer) {
    if (rooms.findIndex((e) => e.id === id) > -1) {
        return rooms[rooms.findIndex((e) => e.id === id)].master === viewer;
    }
}

module.exports = SocketService;

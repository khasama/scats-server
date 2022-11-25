const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const createError = require("http-errors");
const cors = require("cors");
const session = require("express-session");
const fileUpload = require("express-fileupload");

// const cookieParser = require("cookie-parser");
// const Redis = require("ioredis");
// const RedisStore = require("connect-redis")(session);
// const connect = require("./src/configs/mongo");

// const clientRedis = new Redis();
const SocketService = require("./src/services/socket.service");
const { verifyTokenManager } = require("./src/middlewares");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/public", express.static("./src/public"));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(
    session({
        // store: new RedisStore({ client: clientRedis }),
        secret: "thisissecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);

io.on("connection", (socket) => {
    SocketService.init(socket, io);
});

app.use("/api/v1", require("./src/routes"));
app.use("/admin", verifyTokenManager(2), require("./src/routes/admin.route"));

app.get('/login', (req, res) => {
    if (req.session.token) return res.redirect('/admin');
    return res.render("login");
});
app.get('/', (req, res) => {
    if (req.session.token) return res.redirect('/admin');
    return res.redirect('/login');
});

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    return res.status(err.status).json({
        status: "Error",
        message: err.message,
    });
});

module.exports = server;

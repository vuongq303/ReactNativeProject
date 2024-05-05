const app = require("./config");
const dotenv = require("./config/.env");
const http = require("http");
const socketIo = require("socket.io");

const routerLogin = require("./router/login");
const routerProduct = require("./router/product");
const routerCart = require("./router/cart");
const routerFavorite = require("./router/favorite");
const chatRouter = require("./router/chat");
const passwordRouter = require("./router/password");
const recentRouter = require("./router/recent");
const commentRouter = require("./router/comment");
const defaultRouter = require("./config/router");

const server = http.createServer(app);
const io = socketIo(server);

app.use("/", defaultRouter);
app.use("/login", routerLogin);
app.use("/products", routerProduct);
app.use("/cart", routerCart);
app.use("/favorite", routerFavorite);
app.use("/chat", chatRouter);
app.use("/password", passwordRouter);
app.use("/recent", recentRouter);
app.use("/comment", commentRouter);

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on("sendMessage", (message) => {
    io.sockets.emit("returnMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(dotenv.port, () => {
  console.log("Server running in " + dotenv.port + "...");
});

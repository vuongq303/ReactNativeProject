const express = require("express"),
  dotenv = require("dotenv"),
  mongoose = require("mongoose"),
  routerLogin = require("./router/login"),
  getEnv = require("./controller/getEnv"),
  routerProduct = require("./router/product"),
  routerCart = require("./router/cart"),
  routerFavorite = require("./router/favorite"),
  chatRouter = require("./router/chat"),
  http = require("http"),
  socketIo = require("socket.io"),
  passwordRouter = require("./router/password"),
  recentRouter = require("./router/recent"),
  commentRouter = require("./router/comment");

const app = express();
app.use(express.json());
dotenv.config();

const port = getEnv.getPort();
const db_name = getEnv.getDatabase();
const db_url = getEnv.getUrlDatabase();

const server = http.createServer(app);
const io = socketIo(server);

mongoose
  .connect(db_url + db_name)
  .then(function () {
    console.log(`Connected ${db_name}...`);
  })
  .catch(function (err) {
    console.log(err);
  });

app.get("/", (req, res) => res.send("<h1>Hello</h1>"));
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

server.listen(port, () => {
  console.log("Server running in " + port + "...");
});

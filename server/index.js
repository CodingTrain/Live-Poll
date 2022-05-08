/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const broadcaster = require("./helpers/broadcaster");

app.set("views", "./views");
app.set("view engine", "pug");
app.set("broadcaster", broadcaster);

app.use(express.static("public"));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Routes
const webRoutes = require("./web");
app.use("/", webRoutes);

const apiRoutes = require("./api");
app.use("/api", apiRoutes);

// const createNewPoll = require("./helpers/createNewPoll");
// createNewPoll("Your question here", ["Option A", "Option B", "Option C"]);

io.on("connection", (socket) => {
  socket.on("listenForPoll", (pollId) => {
    broadcaster.registerSocket(pollId, socket);
  });
  socket.on("disconnect", () => {
    broadcaster.unregisterSocket(socket.id);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

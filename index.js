const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require("./routers/projectsRouter");
const actionsRouter = require("./routers/actionsRouter");

const PORT = 4000;

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);
// server.use("/api/actions", actionsRouter);


server.listen(PORT, err => {
  console.log(`server is now running on port ${PORT}`);
});
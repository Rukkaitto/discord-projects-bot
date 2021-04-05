require("dotenv").config();
const express = require("express");
const { db, Server } = require("./db");
const {
  getServers,
  getServer,
  postServer,
  postProject,
  postMember,
} = require("./endpoints");
const api = express();

api.use(express.json());

const port = 3000;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  api.get("/servers", getServers);

  api.get("/:serverId", getServer);

  api.post("/servers", postServer);

  api.post("/:serverId/projects", postProject);

  api.post("/:serverId/:projectId/members", postMember);

  api.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

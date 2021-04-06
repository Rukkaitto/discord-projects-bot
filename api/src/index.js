require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const {
  getServers,
  getServer,
  getProjects,
  postServer,
  postProject,
  postMember,
} = require("./endpoints");
const api = express();

api.use(express.json());
api.use(cors());

const port = 3001;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  api.get("/servers", getServers);

  api.get("/:serverId", getServer);

  api.get("/:serverId/projects", getProjects);

  api.post("/servers", postServer);

  api.post("/:serverId/projects", postProject);

  api.post("/:serverId/:projectId/members", postMember);

  api.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

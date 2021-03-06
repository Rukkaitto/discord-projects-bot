import express from "express";
import cors from "cors";
import { db } from "./db";

import {
  getServers,
  getServer,
  getProjects,
  getLogs,
  postServer,
  postProject,
  postMember,
  postLog,
  deleteMember,
  deleteProject,
} from "./endpoints";
const api = express();

api.use(express.json());
api.use(cors());

const port = 3001;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  api.get("/servers", getServers);

  api.get("/:serverId", getServer);

  api.get("/:serverId/projects", getProjects);

  api.get("/:serverId/:projectId/logs", getLogs);

  api.post("/servers", postServer);

  api.post("/:serverId/projects", postProject);

  api.post("/:serverId/:projectId/members", postMember);

  api.post("/:serverId/:projectId/logs", postLog);

  api.delete("/:serverId/:projectId/:memberId", deleteMember);

  api.delete("/:serverId/:projectId", deleteProject);

  api.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

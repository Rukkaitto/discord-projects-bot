require("dotenv").config();
const express = require("express");
const api = express();
const { db, Server, Project, User } = require("./db");

api.use(express.json());

const port = 3000;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  api.get("/servers", async (req, res) => {
    const servers = await Server.find({});
    if (servers) {
      res.json(servers);
    }
  });

  api.get("/:serverId", async (req, res) => {
    const { serverId } = req.params;
    const server = await Server.findById(serverId);
    res.json(server);
  });

  api.post("/servers", async (req, res) => {
    const { id, name } = req.body;
    server = new Server({
      _id: id,
      name: name,
    });
    const result = await server.save();
    res.json(result);
  });

  api.post("/:serverId/projects", async (req, res) => {
    const { serverId } = req.params;
    const { title, id, username, avatar } = req.body;
    const server = await Server.findById(serverId);
    if (server) {
      server.projects.push({
        title: title,
        members: [
          {
            _id: id,
            username: username,
            avatar: avatar,
          },
        ],
      });
      const result = await server.save();
      if (result) {
        res.json({ response: "Successfully created new project." });
      } else {
        res.json({ response: "Could not create project." });
      }
    }
  });

  api.post("/:serverId/:projectId/members", async (req, res) => {
    const { serverId, projectId } = req.params;
    const { id, username, avatar } = req.body;
    const server = await Server.findById(serverId);
    const project = await server.projects.id(projectId);
    project.members.push({
      _id: id,
      username: username,
      avatar: avatar,
    });
    const result = await server.save();
    if (result) {
      res.json({ response: "Successfully added member to project." });
    } else {
      res.json({ response: "Could not add member to project." });
    }
  });

  api.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

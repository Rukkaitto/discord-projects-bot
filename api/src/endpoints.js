const { Server } = require("./db");

const getServers = async (req, res) => {
  const servers = await Server.find({});
  res.json(servers);
};

const getServer = async (req, res) => {
  const { serverId } = req.params;
  const server = await Server.findById(serverId);
  res.json(server);
};

const postServer = async (req, res) => {
  const { _id, name, icon } = req.body;
  server = new Server({
    _id,
    name,
    icon,
  });
  const result = await server.save();
  res.json(result);
};

const postProject = async (req, res) => {
  const { serverId } = req.params;
  const { title, _id, username, avatar } = req.body;
  const server = await Server.findById(serverId);
  if (server) {
    server.projects.push({
      title: title,
      members: [
        {
          _id,
          username,
          avatar,
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
};

const postMember = async (req, res) => {
  const { serverId, projectId } = req.params;
  const { _id, username, avatar } = req.body;
  const server = await Server.findById(serverId);
  const project = await server.projects.id(projectId);
  project.members.push({
    _id,
    username,
    avatar,
  });
  const result = await server.save();
  if (result) {
    res.json({ response: "Successfully added member to project." });
  } else {
    res.json({ response: "Could not add member to project." });
  }
};

module.exports = {
  getServers,
  getServer,
  postServer,
  postProject,
  postMember,
};
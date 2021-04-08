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

const getProjects = async (req, res) => {
  const { serverId } = req.params;
  const { projects } = await Server.findById(serverId);
  res.json(projects);
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

const postLog = async (req, res) => {
  const { serverId, projectId } = req.params;
  const { message, userId, username, avatar } = req.body;
  const server = await Server.findById(serverId);
  const project = await server.projects.id(projectId);
  project.logs.push({
    author: {
      userId,
      username,
      avatar,
    },
    message: message,
  });
  const result = await server.save();
  if (result) {
    res.json({ response: "Successfully added log to project." });
  } else {
    res.json({ response: "Could not add log to project." });
  }
};

const deleteMember = async (req, res) => {
  const { serverId, projectId, memberId } = req.params;
  const server = await Server.findById(serverId);
  const project = await server.projects.id(projectId);
  project.members = project.members.filter((member) => member._id !== memberId);
  const result = await server.save();
  if (project.members.length == 0) {
    server.projects = server.projects.filter(
      (project) => project._id != projectId
    );
    await server.save();
  }
  if (result) {
    res.json({ response: "Successfully removed member from project." });
  } else {
    res.json({ response: "Could not remove member from project." });
  }
};

const deleteProject = async (req, res) => {
  const { serverId, projectId } = req.params;
  const server = await Server.findById(serverId);
  server.projects = server.projects.filter(
    (project) => project._id != projectId
  );
  const result = await server.save();
  if (result) {
    res.json({ response: "Successfully deleted project." });
  } else {
    res.json({ response: "Could not delete project." });
  }
};

module.exports = {
  getServers,
  getServer,
  getProjects,
  postServer,
  postProject,
  postMember,
  postLog,
  deleteMember,
  deleteProject,
};

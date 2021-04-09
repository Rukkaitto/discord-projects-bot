import { Server } from "../db";
import { Request, Response } from "express";

export const getServers = async (req: Request, res: Response) => {
  const servers = await Server.find({});
  res.json(servers);
};

export const getServer = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const server = await Server.findById(serverId);
  res.json(server);
};

export const getProjects = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const { projects } = await Server.findById(serverId);
  res.json(projects);
};

export const getLogs = async (req: Request, res: Response) => {
  const { serverId, projectId } = req.params;
  const server = await Server.findById(serverId);
  const project = await server.projects.id(projectId);
  res.json(project.logs);
};

export const postServer = async (req: Request, res: Response) => {
  const { _id, name, icon } = req.body;
  const server = new Server({
    _id,
    name,
    icon,
  });
  const result = await server.save();
  res.json(result);
};

export const postProject = async (req: Request, res: Response) => {
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

export const postMember = async (req: Request, res: Response) => {
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

export const postLog = async (req: Request, res: Response) => {
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

export const deleteMember = async (req: Request, res: Response) => {
  const { serverId, projectId, memberId } = req.params;
  const server = await Server.findById(serverId);
  const project = await server.projects.id(projectId);
  project.members = project.members.filter(
    (member: any) => member._id !== memberId
  );
  const result = await server.save();
  if (project.members.length == 0) {
    server.projects = server.projects.filter(
      (project: any) => project._id != projectId
    );
    await server.save();
  }
  if (result) {
    res.json({ response: "Successfully removed member from project." });
  } else {
    res.json({ response: "Could not remove member from project." });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { serverId, projectId } = req.params;
  const server = await Server.findById(serverId);
  server.projects = server.projects.filter(
    (project: any) => project._id != projectId
  );
  const result = await server.save();
  if (result) {
    res.json({ response: "Successfully deleted project." });
  } else {
    res.json({ response: "Could not delete project." });
  }
};

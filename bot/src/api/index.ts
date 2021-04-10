import axios from "axios";
import { Guild, User } from "discord.js";
import { APIResponse, Log, Project, Server } from "../interfaces";

const apiUrl = process.env.API_URL;

export const getServer = async (guild: Guild) => {
  const response = await axios.get<Server>(`${apiUrl}/${guild.id}`);
  return response.data;
};

export const postServer = async (guild: Guild) => {
  const { id: _id, name } = guild;
  const icon = guild.iconURL({ dynamic: true });
  const response = await axios.post<Server>(`${apiUrl}/servers`, {
    _id,
    name,
    icon,
  });
  return response.data;
};

export const postProject = async (
  project: Project,
  guild: Guild,
  user: User
) => {
  const { title } = project;
  const { id: _id, username } = user;
  const avatar = user.avatarURL();
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${guild.id}/projects`,
    {
      title,
      _id,
      username,
      avatar,
    }
  );
  return response.data;
};

export const postMember = async (
  project: Project,
  guild: Guild,
  user: User
) => {
  const { id: _id, username } = user;
  const avatar = user.avatarURL();
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${guild.id}/${project._id}/members`,
    { _id, username, avatar }
  );
  return response.data;
};

export const postLog = async (
  log: Log,
  project: Project,
  guild: Guild,
  user: User
) => {
  const { message } = log;
  const { id: _id, username } = user;
  const avatar = user.avatarURL();
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${guild.id}/${project._id}/logs`,
    {
      message,
      _id,
      username,
      avatar,
    }
  );
  return response.data;
};

export const deleteMember = async (
  user: User,
  guild: Guild,
  project: Project
) => {
  const response = await axios.delete<APIResponse>(
    `${apiUrl}/${guild.id}/${project._id}/${user.id}`
  );
  return response.data;
};

export const deleteProject = async (project: Project, guild: Guild) => {
  const response = await axios.delete<APIResponse>(
    `${apiUrl}/${guild.id}/${project._id}`
  );
  return response.data;
};

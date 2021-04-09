import axios from "axios";
import { APIResponse, Member, Server } from "../interfaces";

const apiUrl = process.env.API_URL;

export const getServer = async (serverId: string) => {
  const response = await axios.get<Server>(`${apiUrl}/${serverId}`);
  return response.data;
};

export const postServer = async (
  _id: string,
  name: string,
  icon: string | null
) => {
  const response = await axios.post<Server>(`${apiUrl}/servers`, {
    _id,
    name,
    icon,
  });
  return response.data;
};

export const postProject = async (
  serverId: string,
  title: string,
  user: Member
) => {
  const { _id, username, avatar } = user;
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${serverId}/projects`,
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
  serverId: string,
  projectId: string,
  user: Member
) => {
  const { _id, username, avatar } = user;
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${serverId}/${projectId}/members`,
    { _id, username, avatar }
  );
  return response.data;
};

export const postLog = async (
  serverId: string,
  projectId: string,
  message: string,
  user: Member
) => {
  const { _id, username, avatar } = user;
  const response = await axios.post<APIResponse>(
    `${apiUrl}/${serverId}/${projectId}/logs`,
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
  serverId: string,
  projectId: string,
  memberId: string
) => {
  const response = await axios.delete<APIResponse>(
    `${apiUrl}/${serverId}/${projectId}/${memberId}`
  );
  return response.data;
};

export const deleteProject = async (serverId: string, projectId: string) => {
  const response = await axios.delete<APIResponse>(
    `${apiUrl}/${serverId}/${projectId}`
  );
  return response.data;
};

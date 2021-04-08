const axios = require("axios");

const apiUrl = process.env.API_URL;

const getServer = async (serverId) => {
  const response = await axios.get(`${apiUrl}/${serverId}`);
  return response.data;
};

const postServer = async (_id, name, icon) => {
  const response = await axios.post(`${apiUrl}/servers`, { _id, name, icon });
  return response.data;
};

const postProject = async (serverId, title, _id, username, avatar) => {
  const response = await axios.post(`${apiUrl}/${serverId}/projects`, {
    title,
    _id,
    username,
    avatar,
  });
  return response.data;
};

const postMember = async (serverId, projectId, _id, username, avatar) => {
  const response = await axios.post(
    `${apiUrl}/${serverId}/${projectId}/members`,
    { _id, username, avatar }
  );
  return response.data;
};

const postLog = async (
  serverId,
  projectId,
  message,
  userId,
  username,
  avatar
) => {
  const response = await axios.post(`${apiUrl}/${serverId}/${projectId}/logs`, {
    message,
    userId,
    username,
    avatar,
  });
  return response.data;
};

const deleteMember = async (serverId, projectId, memberId) => {
  const response = await axios.delete(
    `${apiUrl}/${serverId}/${projectId}/${memberId}`
  );
  return response.data;
};

const deleteProject = async (serverId, projectId) => {
  const response = await axios.delete(`${apiUrl}/${serverId}/${projectId}`);
  return response.data;
};

module.exports = {
  getServer,
  postServer,
  postProject,
  postMember,
  postLog,
  deleteMember,
  deleteProject,
};

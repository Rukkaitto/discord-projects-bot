const axios = require("axios");

const apiUrl = process.env.API_URL;

const getServer = async (serverId) => {
    const response = await axios.get(`${apiUrl}/${serverId}`);
    return response.data;
};

const postServer = async (id, name) => {
    const response = await axios.post(`${apiUrl}/servers`, { id, name });
    return response.data;
}

const postProject = async (serverId, title, id, username, avatar) => {
    const response = await axios.post(`${apiUrl}/${serverId}/projects`, { title, id, username, avatar });
    return response.data;
}

const postMember = async (serverId, projectId, id, username, avatar) => {
    const response = await axios.post(`${apiUrl}/${serverId}/${projectId}/members`, { id, username, avatar })
    return response.data;
}

module.exports = {
    getServer, postServer, postProject, postMember,
}
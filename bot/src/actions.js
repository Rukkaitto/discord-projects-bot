const {
  postProject,
  postMember,
  deleteMember,
  deleteProject,
  postLog,
} = require("./api");
const {
  makeProjectListMessageEmbed,
  makeUsageMessageEmbed,
  sendMessageEmbed,
} = require("./utils");

const create = async (message, guildId, title, user) => {
  const projectResult = await postProject(guildId, title, ...user);
  await message.reply(projectResult.response);
};

const list = async (projects, channel) => {
  const messageEmbed = makeProjectListMessageEmbed(projects);
  await sendMessageEmbed(channel, messageEmbed);
};

const join = async (param, projects, authorId, guildId, user, message) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      message.reply("You are already a member of this project.");
    } else {
      const memberResult = await postMember(
        guildId,
        selectedProject._id,
        ...user
      );
      message.reply(memberResult.response);
    }
  } else {
    message.reply("Invalid project number.");
  }
};

const leave = async (param, projects, authorId, guildId, message) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      const result = await deleteMember(guildId, selectedProject._id, authorId);
      message.reply(result.response);
    } else {
      message.reply("You are not part of this project.");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

const remove = async (param, projects, message, guildId, authorId) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userIsCreator = selectedProject.members[0]._id === authorId;
    if (userIsCreator) {
      const result = await deleteProject(guildId, selectedProject._id);
      message.reply(result.response);
    } else {
      message.reply("You are not the creator of this project");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

const log = async (
  projectNumber,
  logMessage,
  projects,
  authorId,
  guildId,
  user,
  message
) => {
  const number = parseInt(projectNumber);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      const result = await postLog(
        guildId,
        selectedProject._id,
        logMessage,
        ...user
      );
      message.reply(result.response);
    } else {
      message.reply("You are not a member of this project.");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

const usage = async (channel) => {
  const messageEmbed = makeUsageMessageEmbed();
  await sendMessageEmbed(channel, messageEmbed);
};

module.exports = {
  create,
  list,
  join,
  leave,
  usage,
  remove,
  log,
};

const { postProject } = require("./api");
const { makeProjectListMessageEmbed } = require("./utils");

const create = async (message, guildId, title, user) => {
  const projectResult = await postProject(guildId, title, ...user);
  await message.reply(projectResult.response);
};

const list = async (projects, channel) => {
  const messageEmbed = makeProjectListMessageEmbed(projects);
  await channel.send(messageEmbed);
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

module.exports = {
  create,
  list,
  join,
};

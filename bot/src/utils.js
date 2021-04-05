const { MessageEmbed } = require("discord.js");
const { getServer, postServer } = require("./api");

const getOrCreateServer = async (guild) => {
  const { id, name } = guild;
  var server = await getServer(id);
  if (!server) {
    server = await postServer(id, name);
  }
  return server;
};

const makeProjectListMessageEmbed = (projects, emojis) => {
  const messageEmbed = new MessageEmbed()
    .setTitle("Project list")
    .setColor("#81f097");
  const fields = projects.map((project, idx) => {
    const { title, members } = project;
    const emoji = emojis[idx];
    return {
      name: `${title} ${emoji}`,
      value: `Members: ${members
        .map((member) => `<@${member._id}>`)
        .join(", ")}`,
    };
  });
  messageEmbed.addFields(...fields);
  return messageEmbed;
};

const addReactionsToMessage = async (message, emojis) => {
  emojis.forEach(async (emoji) => {
    await message.react(emoji);
  });
};

module.exports = {
  getOrCreateServer,
  makeProjectListMessageEmbed,
  addReactionsToMessage,
};

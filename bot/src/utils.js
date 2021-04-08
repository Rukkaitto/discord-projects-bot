const { MessageEmbed } = require("discord.js");
const { getServer, postServer } = require("./api");

const getOrCreateServer = async (guild) => {
  const { id, name } = guild;
  const icon = guild.iconURL({ dynamic: true });
  var server = await getServer(id);
  if (!server) {
    server = await postServer(id, name, icon);
  }
  return server;
};

const makeProjectListMessageEmbed = (projects) => {
  const messageEmbed = new MessageEmbed()
    .setTitle("Project list")
    .setColor("#81f097");
  const fields = projects.map((project, idx) => {
    const { title, members } = project;
    return {
      name: `${idx + 1}. ${title}`,
      value: `Members: ${members
        .map((member) => `<@${member._id}>`)
        .join(", ")}`,
    };
  });
  messageEmbed.addFields(...fields);
  return messageEmbed;
};

const makeUsageMessageEmbed = () => {
  const messageEmbed = new MessageEmbed()
    .setTitle("List of available commands:")
    .setColor("#81f097")
    .addFields(
      {
        name: "!project create <Project Name>",
        value: "Creates a new project.",
      },
      { name: "!project list", value: "Lists all projects on this server." },
      {
        name: "!project join <project-number>",
        value: "Adds the user to a project.",
      }
    );
  return messageEmbed;
};

const sendMessageEmbed = async (channel, messageEmbed) => {
  try {
    await channel.send(messageEmbed);
  } catch (error) {
    channel.send("Please allow Embed Links in this channel.");
  }
};

const addReactionsToMessage = async (message, emojis) => {
  emojis.forEach(async (emoji) => {
    await message.react(emoji);
  });
};

module.exports = {
  getOrCreateServer,
  makeProjectListMessageEmbed,
  makeUsageMessageEmbed,
  addReactionsToMessage,
  sendMessageEmbed,
};

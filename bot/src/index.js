require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");
const { getServer, postServer, postProject } = require("./api");
const { random: randomEmoji } = require("random-unicode-emoji");

const client = new Client();
const token = process.env.DISCORD_TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  const { content, channel, author } = message;
  const { guild } = channel;
  const { username } = author;
  const [command, action, ...params] = content.split(" ");
  const param = params.join(" ");
  const projectCommand = "!project";

  if (command === projectCommand) {
    const server = await getServerIfNotExists(guild);

    switch (action) {
      case "create":
        const result = await postProject(guild.id, param, author.id, username, author.displayAvatarURL());
        message.reply(result.response);
        break;
      case "list":
        const { projects } = server;
        const emojis = randomEmoji({ count: projects.length });

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

        const sentMessage = await channel.send(messageEmbed);
        emojis.forEach(async (emoji) => {
          await sentMessage.react(emoji);
        });
        break;
      default:
        break;
    }
  }
});

client.login(token);

const getServerIfNotExists = async (guild) => {
  const { id, name } = guild;
  var server = await getServer(id);
  if (!server) {
    server = await postServer(id, name);
  }
  return server;
};

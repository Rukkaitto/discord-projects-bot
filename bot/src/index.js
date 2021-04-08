require("dotenv").config();
const { Client } = require("discord.js");
const { getOrCreateServer } = require("./utils");
const { create, list, join, usage } = require("./actions");

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
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
    const server = await getOrCreateServer(guild);
    const { projects } = server;

    const user = [author.id, username, author.displayAvatarURL()];

    switch (action) {
      case "create":
        await create(message, guild.id, param, user);
        break;
      case "list":
        await list(projects, channel);
        break;
      case "join":
        await join(param, projects, author.id, guild.id, user, message);
        break;
      default:
        await usage(channel);
        break;
    }
  }
});

client.login(token);

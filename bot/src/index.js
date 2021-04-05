require("dotenv").config();
const { Client } = require("discord.js");
const { random: randomEmoji } = require("random-unicode-emoji");
const { postProject } = require("./api");
const {
  getOrCreateServer,
  makeProjectListMessageEmbed,
  addReactionsToMessage,
} = require("./utils");

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
    const server = await getOrCreateServer(guild);

    switch (action) {
      case "create":
        const result = await postProject(
          guild.id,
          param,
          author.id,
          username,
          author.displayAvatarURL()
        );
        message.reply(result.response);
        break;
      case "list":
        const { projects } = server;
        const emojis = randomEmoji({ count: projects.length });

        const messageEmbed = makeProjectListMessageEmbed(projects, emojis);
        const sentMessage = await channel.send(messageEmbed);

        await addReactionsToMessage(sentMessage, emojis);
        break;
      default:
        break;
    }
  }
});

client.login(token);

require("dotenv").config();
const { Client } = require("discord.js");
const { postProject, postMember } = require("./api");
const {
  getOrCreateServer,
  makeProjectListMessageEmbed,
  addReactionsToMessage,
} = require("./utils");

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

    switch (action) {
      case "create":
        const title = param;
        const projectResult = await postProject(
          guild.id,
          title,
          author.id,
          username,
          author.displayAvatarURL()
        );
        message.reply(projectResult.response);
        break;
      case "list":
        const messageEmbed = makeProjectListMessageEmbed(projects);
        await channel.send(messageEmbed);

        break;
      case "join":
        const number = parseInt(param);
        const memberResult = await postMember(
          guild.id,
          projects[number - 1]._id,
          author.id,
          username,
          author.displayAvatarURL()
        );
        message.reply(memberResult.response);
        break;
      default:
        break;
    }
  }
});

client.login(token);

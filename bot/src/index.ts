import { config } from "dotenv";
config();
import { Client, Message, TextChannel } from "discord.js";
import { getOrCreateServer } from "./utils";
import { create, remove, list, join, leave, usage, log } from "./actions";
import { Member } from "./interfaces";

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const token = process.env.DISCORD_TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (message: Message) => {
  const { content, author } = message;
  const channel = message.channel as TextChannel;
  const { guild } = channel;
  const { username } = author;
  const [command, action, ...params] = content.split(" ");
  const param = params.join(" ");
  const [projectNumber, ...logMessageWords] = params;
  const logMessage = logMessageWords.join(" ");
  const projectCommand = "!project";

  if (command === projectCommand) {
    const server = await getOrCreateServer(guild);
    const { projects } = server;

    const user: Member = {
      _id: author.id,
      username: username,
      avatar: author.displayAvatarURL(),
    };

    switch (action) {
      case "create":
        await create(message, guild.id, param, user);
        break;
      case "delete":
        await remove(param, projects, message, guild.id, author.id);
        break;
      case "list":
        await list(projects, channel);
        break;
      case "join":
        await join(param, projects, author.id, guild.id, user, message);
        break;
      case "leave":
        await leave(param, projects, author.id, guild.id, message);
        break;
      case "log":
        await log(
          projectNumber,
          logMessage,
          projects,
          author.id,
          guild.id,
          user,
          message
        );
        break;
      default:
        await usage(channel);
        break;
    }
  }
});

client.login(token);

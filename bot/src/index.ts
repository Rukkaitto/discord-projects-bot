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
  var [projectNumber, ...logMessageWords] = params;
  const logMessage = logMessageWords.join(" ");
  const projectCommand = "!project";

  if (command === projectCommand) {
    const server = await getOrCreateServer(guild);
    const { projects } = server;

    switch (action) {
      case "create":
        await create(message, { argument: param }, author, guild);
        break;
      case "delete":
        await remove(
          message,
          { projectNumber: projectNumber },
          projects,
          author,
          guild
        );
        break;
      case "list":
        await list(projects, channel);
        break;
      case "join":
        await join(
          message,
          { projectNumber: projectNumber },
          projects,
          author,
          guild
        );
        break;
      case "leave":
        await leave(
          message,
          { projectNumber: projectNumber },
          projects,
          author,
          guild
        );
        break;
      case "log":
        await log(
          message,
          { projectNumber: projectNumber, argument: logMessage },
          projects,
          author,
          guild
        );
        break;
      default:
        await usage(channel);
        break;
    }
  }
});

client.login(token);

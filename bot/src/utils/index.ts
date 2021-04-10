import { Guild, MessageEmbed, TextChannel } from "discord.js";
import { getServer, postServer } from "../api";
import { Member, Project } from "../interfaces";

export const getOrCreateServer = async (guild: Guild) => {
  var server = await getServer(guild);
  if (!server) {
    server = await postServer(guild);
  }
  return server;
};

export const makeProjectListMessageEmbed = (projects: Project[]) => {
  const messageEmbed = new MessageEmbed()
    .setTitle("Project list")
    .setColor("#81f097");
  const fields = projects.map((project, idx) => {
    const { title } = project;
    var { members } = project;
    members = members as Member[];

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

export const makeUsageMessageEmbed = () => {
  const messageEmbed = new MessageEmbed()
    .setTitle("List of available commands:")
    .setColor("#81f097")
    .addFields(
      { name: "!project list", value: "List all the projects on this server." },
      {
        name: "!project create <Project Name>",
        value: "Create a new project.",
      },
      {
        name: "!project log <project-number> <Log message>",
        value: "Add a log to a project.",
      },
      {
        name: "!project delete <project-number>",
        value: "Delete a project.",
      },
      {
        name: "!project join <project-number>",
        value: "Join a project.",
      },
      {
        name: "!project leave <project-number>",
        value: "Leave a project.",
      }
    );
  return messageEmbed;
};

export const sendMessageEmbed = async (
  channel: TextChannel,
  messageEmbed: MessageEmbed
) => {
  try {
    await channel.send(messageEmbed);
  } catch (error) {
    channel.send("Please allow Embed Links in this channel.");
  }
};

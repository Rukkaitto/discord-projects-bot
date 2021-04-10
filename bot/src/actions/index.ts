import { Guild, Message, TextChannel, User } from "discord.js";
import {
  postProject,
  postMember,
  deleteMember,
  deleteProject,
  postLog,
} from "../api";
import { ActionParams, Log, Member, Project } from "../interfaces";
import {
  makeProjectListMessageEmbed,
  makeUsageMessageEmbed,
  sendMessageEmbed,
} from "../utils";

export const create = async (
  message: Message,
  params: ActionParams,
  user: User,
  guild: Guild
) => {
  const project: Project = {
    title: params.argument as string,
  };
  const projectResult = await postProject(project, guild, user);
  await message.reply(projectResult.response);
};

export const list = async (projects: Project[], channel: TextChannel) => {
  const messageEmbed = makeProjectListMessageEmbed(projects);
  await sendMessageEmbed(channel, messageEmbed);
};

export const join = async (
  message: Message,
  params: ActionParams,
  projects: Project[],
  author: User,
  guild: Guild
) => {
  var { projectNumber } = params;
  projectNumber = parseInt(projectNumber as string);

  if (projectNumber && projectNumber <= projects.length) {
    const selectedProject = projects[projectNumber - 1];
    var { members } = selectedProject;
    members = members as Member[];

    const userInMembers = members
      .map((member) => member._id)
      .includes(author.id);

    if (userInMembers) {
      message.reply("You are already a member of this project.");
    } else {
      const memberResult = await postMember(selectedProject, guild, author);
      message.reply(memberResult.response);
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const leave = async (
  message: Message,
  params: ActionParams,
  projects: Project[],
  author: User,
  guild: Guild
) => {
  var { projectNumber } = params;
  projectNumber = parseInt(projectNumber as string);

  if (projectNumber && projectNumber <= projects.length) {
    const selectedProject = projects[projectNumber - 1];
    var { members } = selectedProject;
    members = members as Member[];

    const userInMembers = members
      .map((member) => member._id)
      .includes(author.id);

    if (userInMembers) {
      const result = await deleteMember(author, guild, selectedProject);
      message.reply(result.response);
    } else {
      message.reply("You are not part of this project.");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const remove = async (
  message: Message,
  params: ActionParams,
  projects: Project[],
  author: User,
  guild: Guild
) => {
  var { projectNumber } = params;
  projectNumber = parseInt(projectNumber as string);

  if (projectNumber && projectNumber <= projects.length) {
    const selectedProject = projects[projectNumber - 1];
    var { members } = selectedProject;
    members = members as Member[];

    const userIsCreator = members[0]._id === author.id;

    if (userIsCreator) {
      const result = await deleteProject(selectedProject, guild);
      message.reply(result.response);
    } else {
      message.reply("You are not the creator of this project");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const log = async (
  message: Message,
  params: ActionParams,
  projects: Project[],
  author: User,
  guild: Guild
) => {
  var { projectNumber, argument } = params;
  projectNumber = parseInt(projectNumber as string);
  argument = argument as string;

  const log: Log = {
    message: argument
  }

  if (projectNumber && projectNumber <= projects.length) {
    const selectedProject = projects[projectNumber - 1];
    var { members } = selectedProject;
    members = members as Member[];

    const userInMembers = members
      .map((member) => member._id)
      .includes(author.id);

    if (userInMembers) {
      const result = await postLog(
        log,
        selectedProject,
        guild,
        author,
      );
      message.reply(result.response);
    } else {
      message.reply("You are not a member of this project.");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const usage = async (channel: TextChannel) => {
  const messageEmbed = makeUsageMessageEmbed();
  await sendMessageEmbed(channel, messageEmbed);
};

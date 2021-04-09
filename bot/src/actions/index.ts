import { Channel, Message, TextChannel } from "discord.js";
import {
  postProject,
  postMember,
  deleteMember,
  deleteProject,
  postLog,
} from "../api";
import { Member, Project } from "../interfaces";
import {
  makeProjectListMessageEmbed,
  makeUsageMessageEmbed,
  sendMessageEmbed,
} from "../utils";

export const create = async (
  message: Message,
  guildId: string,
  title: string,
  user: Member
) => {
  const projectResult = await postProject(guildId, title, user);
  await message.reply(projectResult.response);
};

export const list = async (projects: Project[], channel: TextChannel) => {
  const messageEmbed = makeProjectListMessageEmbed(projects);
  await sendMessageEmbed(channel, messageEmbed);
};

export const join = async (
  param: string,
  projects: Project[],
  authorId: string,
  guildId: string,
  user: Member,
  message: Message
) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      message.reply("You are already a member of this project.");
    } else {
      const memberResult = await postMember(guildId, selectedProject._id, user);
      message.reply(memberResult.response);
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const leave = async (
  param: string,
  projects: Project[],
  authorId: string,
  guildId: string,
  message: Message
) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      const result = await deleteMember(guildId, selectedProject._id, authorId);
      message.reply(result.response);
    } else {
      message.reply("You are not part of this project.");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const remove = async (
  param: string,
  projects: Project[],
  message: Message,
  guildId: string,
  authorId: string
) => {
  const number = parseInt(param);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userIsCreator = selectedProject.members[0]._id === authorId;
    if (userIsCreator) {
      const result = await deleteProject(guildId, selectedProject._id);
      message.reply(result.response);
    } else {
      message.reply("You are not the creator of this project");
    }
  } else {
    message.reply("Invalid project number.");
  }
};

export const log = async (
  projectNumber: string,
  logMessage: string,
  projects: Project[],
  authorId: string,
  guildId: string,
  user: Member,
  message: Message
) => {
  const number = parseInt(projectNumber);
  if (number && number <= projects.length) {
    const selectedProject = projects[number - 1];
    const userInMembers = selectedProject.members
      .map((member) => member._id)
      .includes(authorId);
    if (userInMembers) {
      const result = await postLog(
        guildId,
        selectedProject._id,
        logMessage,
        user
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

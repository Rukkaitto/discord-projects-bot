const { Server } = require("./db");
const { MessageEmbed } = require("discord.js");
const { random: randomEmoji } = require("random-unicode-emoji");

module.exports = (client, token) => {
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
      const server = await getServer(guild);

      switch (action) {
        case "create":
          server.projects.push({
            title: param,
            members: [
              {
                _id: author.id,
                username: username,
                avatar: author.displayAvatarURL(),
              },
            ],
          });
          const result = await server.save();
          if (result) message.reply("created project successfully.");
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
                .map((member) => `<@${member.id}>`)
                .join(", ")}`,
            };
          });
          messageEmbed.addFields(fields);

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
};

const getServer = async (guild) => {
  var server = await Server.findById(guild.id);
  if (!server) {
    serverQuery = new Server({
      _id: guild.id,
      name: guild.name,
    });
    server = await serverQuery.save();
  }
  return server;
};

const { Server } = require("./db");
const { MessageEmbed } = require("discord.js");

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
      var server = await Server.findById(guild.id);
      if (!server) {
        serverQuery = new Server({
          _id: guild.id,
          name: guild.name,
        });
        server = await serverQuery.save();
      }

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

          const messageEmbed = new MessageEmbed().setTitle("Project list");
          const fields = projects.map((project) => {
            const { title, members } = project;
            return {
              name: title,
              value: members.map((member) => `<@${member.id}>`).join(", "),
            };
          });
          messageEmbed.addFields(fields);

          channel.send(messageEmbed);
          break;
        default:
          break;
      }
    }
  });

  client.login(token);
};

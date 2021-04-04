const { User, Server, Project } = require("./db");
const { ObjectId } = require("mongoose").Types;

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
          await server.save();
          break;
        case "list":
          const { projects } = server;

          const projectList = projects.reduce((acc, project) => {
            const { title, members } = project;
            return `${acc}- ${title} (${members.reduce((acc2, member) => {
              return `${acc2} <@${member.id}>,`;
            }, "")})\n`;
          }, "List of all projects on this server:\n");

          channel.send(projectList);
          break;
        default:
          break;
      }
    }
  });

  client.login(token);
};

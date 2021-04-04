const { User, Server, Project } = require("./db");

module.exports = (client, token) => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", (message) => {
    const { content, channel } = message;
    const [command, action, ...params] = content.split(" ");
    const param = params.join(" ");
    const projectCommand = "!project";

    if (command === projectCommand) {
      switch (action) {
        case "create":
          const project = new Project({
            title: param,
          });
          project.save(function (err) {
            if (err) return;
            message.reply("Project created successfully.");
          });
          break;
        case "list":
          Project.find({}, (err, projects) => {
            if (err) return;

            projectList = projects.reduce((prev, curr) => {
              return `${prev}- ${curr.title}\n`;
            }, "List of all projects on this server:\n");

            channel.send(projectList);
          });

          break;
        default:
          break;
      }
    }
  });

  client.login(token);
};

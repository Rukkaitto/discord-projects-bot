require("dotenv").config();
const { db } = require("./db");
const { Client } = require("discord.js");
const client = new Client();

const token = process.env.DISCORD_TOKEN;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("message", (msg) => {
    if (msg.content === "ping") {
      msg.reply("Pong!");
    }
  });

  client.login(token);
});

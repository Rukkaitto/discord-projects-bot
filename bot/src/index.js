require("dotenv").config();
const { db } = require("./db");
const bot = require("./bot");
const { Client } = require("discord.js");
const client = new Client();

const token = process.env.DISCORD_TOKEN;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to database.");
  bot(client, token);
});

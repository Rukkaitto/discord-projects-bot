const { Schema } = require("mongoose");
const logsSchema = require("./log");
const userSchema = require("./user");

const projectSchema = new Schema({
  title: String,
  logs: [logsSchema],
  members: [userSchema],
});

module.exports = projectSchema;

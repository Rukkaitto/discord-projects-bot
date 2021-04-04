const { Schema } = require("mongoose");
const projectSchema = require("./project");

const serverSchema = new Schema({
  name: String,
  projects: [projectSchema],
});

module.exports = serverSchema;

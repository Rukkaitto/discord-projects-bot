const { Schema } = require("mongoose");
const projectSchema = require("./project");

const serverSchema = new Schema({
  _id: String,
  name: String,
  projects: [projectSchema],
});

module.exports = serverSchema;

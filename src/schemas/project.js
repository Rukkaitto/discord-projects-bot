const { Schema } = require("mongoose");
const userSchema = require("./user");

const projectSchema = new Schema({
  title: String,
  members: [userSchema],
});

module.exports = projectSchema;

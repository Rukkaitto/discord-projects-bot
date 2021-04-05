const { Schema } = require("mongoose");

const userSchema = new Schema({
  _id: String,
  username: String,
  avatar: String,
});

module.exports = userSchema;

const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
});

module.exports = userSchema;

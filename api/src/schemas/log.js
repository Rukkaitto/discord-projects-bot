const { Schema } = require("mongoose");
const userSchema = require("./user");

const logsSchema = new Schema(
  {
    author: userSchema,
    message: String,
  },
  { timestamps: true }
);

module.exports = logsSchema;

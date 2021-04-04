const mongoose = require("mongoose");
const serverSchema = require("./schemas/server");
const projectSchema = require("./schemas/project");
const userSchema = require("./schemas/user");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017`;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const Server = mongoose.model("Server", serverSchema);
const Project = mongoose.model("Project", projectSchema);
const User = mongoose.model("User", userSchema);

const db = mongoose.connection;

module.exports = {
  db,
  Server,
  Project,
  User,
};

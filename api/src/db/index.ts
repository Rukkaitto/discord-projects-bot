import mongoose from "mongoose";
import { serverSchema } from "../schemas/server";
import { projectSchema } from "../schemas/project";
import { userSchema } from "../schemas/user";
import { config } from "dotenv";

config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017`;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

export const Server = mongoose.model("Server", serverSchema);
export const Project = mongoose.model("Project", projectSchema);
export const User = mongoose.model("User", userSchema);

export const db = mongoose.connection;

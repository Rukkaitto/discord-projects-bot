import { Schema } from "mongoose";
import { logsSchema } from "./log";
import { userSchema } from "./user";

export const projectSchema = new Schema({
  title: String,
  logs: [logsSchema],
  members: [userSchema],
});

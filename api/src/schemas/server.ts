import { Schema } from "mongoose";
import { projectSchema } from "./project";

export const serverSchema = new Schema({
  _id: String,
  name: String,
  icon: String,
  projects: [projectSchema],
});

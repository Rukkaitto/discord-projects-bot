import { Schema } from "mongoose";
import { userSchema } from "./user";

export const logsSchema = new Schema(
  {
    author: userSchema,
    message: String,
  },
  { timestamps: true }
);

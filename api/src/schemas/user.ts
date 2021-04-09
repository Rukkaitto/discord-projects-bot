import { Schema } from "mongoose";

export const userSchema = new Schema({
  _id: String,
  username: String,
  avatar: String,
});

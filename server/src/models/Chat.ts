import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  query: string;
  response: string;
  createdAt: Date;
}

const ChatSchema: Schema = new Schema({
  query: { type: String, required: true },
  response: { type: String, required: true },
  aiModel: { type: String, required: true }, // Updated here too
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IChat>("Chat", ChatSchema);

// models/Workspace.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  users: mongoose.Types.ObjectId[];
  taskboards: mongoose.Types.ObjectId[];
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    taskboards: [{ type: Schema.Types.ObjectId, ref: "TaskBoard" }],
  },
  { timestamps: true }
);

export default mongoose.models.Workspace ||
  mongoose.model<IWorkspace>("Workspace", workspaceSchema);

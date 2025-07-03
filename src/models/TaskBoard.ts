import mongoose, { Schema, Document } from "mongoose";

export interface ITaskBoard extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  todos: mongoose.Types.ObjectId[];
}

const TaskBoardSchema = new Schema<ITaskBoard>(
  {
    title: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

export default mongoose.models.TaskBoard ||
  mongoose.model<ITaskBoard>("TaskBoard", TaskBoardSchema);

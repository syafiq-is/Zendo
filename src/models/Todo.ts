import { Schema, Types, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    author: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SubTaskSchema = new Schema(
  {
    title: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { _id: false }
);

const AttachmentSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String }, // e.g., image/pdf/doc
  },
  { _id: false }
);

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    progress: {
      type: String,
      enum: ["todo", "in_progress", "done", "archived"],
      default: "todo",
    },

    members: [{ type: Types.ObjectId, ref: "User" }],

    comments: [CommentSchema],
    subTasks: [SubTaskSchema],
    attachments: [AttachmentSchema],

    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Todo || model("Todo", TodoSchema);

import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { GridFSBucket } from "mongodb";

import fs from "fs";
import path from "path";

import User from "@/models/User";
import Workspace from "@/models/Workspace";
import TaskBoard from "@/models/TaskBoard";
import Todo from "@/models/Todo";

// Upload local image to GridFS and return its ObjectId
async function uploadImageToGridFS(
  filename: string,
  bucket: GridFSBucket
): Promise<mongoose.Types.ObjectId> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "public", "images", filename);

    if (!fs.existsSync(filePath)) {
      return reject(new Error(`❌ Image not found: ${filePath}`));
    }

    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(filename);

    readStream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        if (!uploadStream.id) {
          return reject(new Error("Upload finished but no file ID returned"));
        }
        console.log(`✅ Uploaded ${filename} as ID: ${uploadStream.id}`);
        resolve(uploadStream.id as mongoose.Types.ObjectId);
      });
  });
}

async function seed() {
  console.log("🌱 Seeder running...");
  const { bucket } = await connectDB();
  console.log("🚀 MongoDB connected");

  // Clean GridFS
  try {
    const db = mongoose.connection.db;
    const filesDeleted = await db
      ?.collection("profileImgs.files")
      .deleteMany({});
    const chunksDeleted = await db
      ?.collection("profileImgs.chunks")
      .deleteMany({});
    console.log(
      `🧹 Cleaned GridFS: ${filesDeleted?.deletedCount} files, ${chunksDeleted?.deletedCount} chunks`
    );
  } catch (err) {
    console.error("❌ Failed to clean GridFS:", err);
    process.exit(1);
  }

  try {
    // Clear data
    await User.deleteMany();
    await Workspace.deleteMany();
    await TaskBoard.deleteMany();
    await Todo.deleteMany();

    // Upload images
    await uploadImageToGridFS("profile_hsy.jpg", bucket);
    await uploadImageToGridFS("profile_kdj.jpg", bucket);

    // Create users
    const [admin, dokja] = await User.insertMany([
      {
        username: "Admin",
        email: "admin@email.com",
        passwordHash: await bcrypt.hash("password", 10),
        profileImg: "profile_hsy.jpg",
      },
      {
        username: "Kim Dokja",
        email: "kim.dj@email.com",
        passwordHash: await bcrypt.hash("password", 10),
        profileImg: "profile_kdj.jpg",
      },
    ]);

    // Create todo
    const [todo] = await Todo.insertMany([
      {
        title: "Implement Seeder",
        description:
          "Seeder should reflect workspace > taskboard > todo structure",
        tags: ["seed", "init"],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        priority: "urgent",
        progress: "todo",
        createdBy: admin._id,
        members: [admin._id, dokja._id],
        subTasks: [
          { title: "Create models", isDone: true },
          { title: "Write seeder script" },
        ],
        comments: [
          {
            author: dokja._id,
            text: "This better not break the app again 😤",
          },
        ],
        attachments: [
          {
            name: "schema.png",
            url: "https://example.com/schema.png",
            type: "image",
          },
        ],
      },
    ]);

    // Create taskboards
    const taskboards = await TaskBoard.insertMany([
      { title: "Todo", todos: [todo._id] },
      { title: "In progress", todos: [] },
      { title: "Done", todos: [] },
      { title: "Random Board", todos: [] },
      { title: "Random Board Again", todos: [] },
    ]);

    // Create workspaces
    await Workspace.insertMany([
      {
        name: "Workspace 1",
        users: [admin._id, dokja._id],
        taskboards: [taskboards[0]._id, taskboards[1]._id, taskboards[2]._id],
      },
      {
        name: "Workspace 2",
        users: [admin._id, dokja._id],
        taskboards: [taskboards[3]._id],
      },
      {
        name: "Workspace 3",
        users: [admin._id],
        taskboards: [taskboards[4]._id],
      },
    ]);

    console.log("✅ Seeder ran like a boss.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder exploded:", err);
    process.exit(1);
  }
}

seed();

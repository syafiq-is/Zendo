import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import Workspace from "@/models/Workspace";
import TaskBoard from "@/models/TaskBoard";
import Todo from "@/models/Todo";
import bcrypt from "bcrypt";

async function seed() {
  console.log("Working Directory:", process.cwd());
  console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
  await connectDB();
  console.log("🚀 Connected to MongoDB");

  try {
    // Clear previous
    await User.deleteMany();
    await Workspace.deleteMany();
    await TaskBoard.deleteMany();
    await Todo.deleteMany();

    // Users
    const [admin, dokja] = await User.insertMany([
      {
        username: "Admin",
        email: "admin@email.com",
        passwordHash: await bcrypt.hash("password", 10),
      },
      {
        username: "Kim Dokja",
        email: "kim.dj@email.com",
        passwordHash: await bcrypt.hash("password", 10),
      },
    ]);

    // Todo
    const todo = await Todo.insertMany([
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

    // TaskBoard
    const taskboards = await TaskBoard.insertMany([
      {
        title: "Todo",
        todos: [todo[0].id],
      },
      {
        title: "In progress",
        todos: [],
      },
      {
        title: "Done",
        todos: [],
      },
      {
        title: "Random Board",
        todos: [],
      },
      {
        title: "Random Board Again",
        todos: [],
      },
    ]);

    // Workspace
    const workspace = await Workspace.insertMany([
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

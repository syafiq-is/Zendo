// app/api/workspace/route.ts
import { connectDB } from "@/lib/mongo";
import Workspace from "@/models/Workspace";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/JWT";
import "@/models/User";
import "@/models/TaskBoard";
import "@/models/Todo";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspaces = await Workspace.find({ users: userId })
      .populate("users")
      .populate({
        path: "taskboards",
        populate: {
          path: "todos",
          model: "Todo",
        },
      })
      .lean();

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("API /workspace error:", error);
    return NextResponse.json(
      { error: "Internal Server Error:" },
      { status: 500 }
    );
  }
}

import { connectDB } from "@/lib/mongo";
import TaskBoard from "@/models/TaskBoard";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { todoId, fromBoardId, toBoardId } = await req.json();

    if (!todoId || !fromBoardId || !toBoardId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Remove from original board
    await TaskBoard.findByIdAndUpdate(fromBoardId, {
      $pull: { todos: todoId },
    });

    // Add to target board
    await TaskBoard.findByIdAndUpdate(toBoardId, {
      $push: { todos: todoId },
    });

    return NextResponse.json({ message: "Todo moved successfully" });
  } catch (error) {
    console.error("Move todo error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

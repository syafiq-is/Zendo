import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUserData } from "@/lib/JWT";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const authUser = await getAuthUserData(req);
    if (!authUser || !authUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const allowedFields = ["username", "email", "profileImg"];
    const updates: Partial<Record<string, any>> = {};

    for (const key of allowedFields) {
      if (key in body) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      authUser.id,
      { $set: updates },
      { new: true }
    ).lean();

    return NextResponse.json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

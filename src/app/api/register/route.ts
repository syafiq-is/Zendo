import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    username,
    password,
  }: { email: string; username: string; password: string } = await req.json();

  // Check required fields
  if (!email || !username || !password) {
    return Response.json(
      { type: "error", message: "Missing fields" },
      { status: 400 }
    );
  }

  // Check password length
  if (password.length < 8) {
    return Response.json(
      { type: "error", message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  await connectDB();

  // Check email availibility
  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json(
      { type: "error", message: "Email already registered" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, username, passwordHash });

  return Response.json(
    {
      type: "success",
      message: "User created successfully!",
      userId: newUser._id,
    },
    { status: 201 }
  );
}

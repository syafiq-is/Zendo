import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  if (!email || !password) {
    return Response.json(
      { type: "error", message: "Missing fields" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json(
      { type: "error", message: "No account found with that email address" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return Response.json(
      { type: "error", message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return Response.json({
    type: "success",
    message: "Login successful",
    token,
  });
}

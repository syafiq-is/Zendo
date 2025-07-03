// app/api/workspace/route.ts
import { connectDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUserData } from "@/lib/JWT";
import User, { IUser } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const jwtData = await getAuthUserData(req);
    const userId = jwtData?.id;
    const user = await User.findById(userId).lean<IUser>();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const authUserData = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
    };

    return NextResponse.json({ authUserData });
  } catch (error) {
    console.error("API /settings/user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error:" },
      { status: 500 }
    );
  }
}

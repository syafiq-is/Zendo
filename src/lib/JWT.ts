// lib/JWT.ts
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const jwtSecret = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(jwtSecret);

export type AuthUserData = {
  id: string;
  username: string;
  email: string;
  profileImg: string;
};

export async function getAuthUserData(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: payload.userId as string,
    };
  } catch (err) {
    console.error("JWT verify failed:", err);
    return null;
  }
}

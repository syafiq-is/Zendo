// app/lib/JWT.ts
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";

export function getAuthUserId(req: NextRequest): string | null {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<{ userId: string }>(token);
    return decoded.userId;
  } catch (err) {
    console.error("JWT decode failed:", err);
    return null;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define protected routes
const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/login" || pathname === "/register") {
    const token = req.cookies.get("token")?.value;

    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (err) {
        console.error("JWT invalid:", err);
        return NextResponse.next(); // Token invalid: show login
      }
    }
  }

  // Only protect dashboard routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Not logged in: redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify JWT
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (err) {
      console.error("JWT invalid:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

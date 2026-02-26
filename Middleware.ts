import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_COOKIE = "auth_token";

export function middleware(req: NextRequest) {
  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payload = jwt.verify(token, secret) as {
        userId: number;
        email: string;
        role: string;
      };

      if (isAdminRoute && payload.role !== "super_admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isAuthPage && token) {
    try {
      jwt.verify(token, secret);
      return NextResponse.redirect(new URL("/", req.url));
    } catch {
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
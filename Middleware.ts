import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const REMEMBER_ME_COOKIE = "remember_me_token";

/**
 * middleware.ts — place this file at the project root (next to next.config.ts)
 *
 * On every request, checks for a valid remember-me cookie.
 * If found and valid, generates a fresh short-lived Bearer token and injects it
 * into the Authorization header so all existing requireAuth() calls work unchanged.
 *
 * This runs on the Edge Runtime — it must stay lightweight (no DB calls).
 */
export function middleware(req: NextRequest) {
  const rememberMeToken = req.cookies.get(REMEMBER_ME_COOKIE)?.value;

  // No cookie — nothing to do
  if (!rememberMeToken) {
    return NextResponse.next();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.next();
  }

  try {
    const payload = jwt.verify(rememberMeToken, secret) as {
      userId: number;
      email: string;
      role: string;
      purpose: string;
    };

    // Guard: only accept tokens issued specifically for remember-me
    if (payload.purpose !== "remember-me") {
      return NextResponse.next();
    }

    // Re-issue a short-lived session token so requireAuth() in route handlers works as-is
    const sessionToken = jwt.sign(
      { userId: payload.userId, email: payload.email, role: payload.role },
      secret,
      { expiresIn: "15m" },
    );

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", `Bearer ${sessionToken}`);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    // Cookie is invalid or expired — clear it so the browser stops sending it
    const response = NextResponse.next();
    response.cookies.set(REMEMBER_ME_COOKIE, "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

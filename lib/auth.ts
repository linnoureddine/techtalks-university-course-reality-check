import jwt from "jsonwebtoken";

/**
 * This type represents the data stored inside the JWT
 */
export type AuthUser = {
  userId: number;
  email: string;
  role: string;
};

/**
 * Extract token from cookies instead of Authorization header
 */
function getTokenFromCookies(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());

  const authCookie = cookies.find((c) =>
    c.startsWith("auth_token=")
  );

  if (!authCookie) return null;

  return authCookie.split("=")[1];
}

/**
 * requireAuth
 * - Used when ANY logged-in user is allowed
 * - Verifies JWT from cookie
 */
export function requireAuth(req: Request): AuthUser {
  const token = getTokenFromCookies(req);
  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("SERVER_ERROR");
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthUser;
    return decoded;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}

/**
 * requireAdmin
 * - Used when ONLY super_admin is allowed
 */
export function requireAdmin(req: Request): AuthUser {
  const user = requireAuth(req);

  if (user.role !== "super_admin") {
    throw new Error("FORBIDDEN");
  }

  return user;
}